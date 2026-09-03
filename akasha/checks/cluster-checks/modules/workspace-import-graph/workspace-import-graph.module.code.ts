import ts from "typescript"
import type { TreeReading } from "../tree-reading/tree-reading.module.code.ts"
import type { ImportGraphs } from "../tsconfig-import-graph/tsconfig-import-graph.module.code.ts"
import {
  type DiscoveredTsFile,
  discoverWorkspaceTsFiles,
  parseTsconfigInTree,
  readTsWorkspaces,
  treeParseConfigHost,
  type Workspace,
  workspaceTsconfigPath,
} from "../workspace-ts-files/workspace-ts-files.module.code.ts"

const VENDOR_DIR = "node_modules"

const SEPARATOR = "/"

const DYNAMIC_IMPORT_SUFFIX_PREFIX = "[dynamic-import-suffix]"

const CONTRIBUTES_ALL: ReadonlySet<DiscoveredTsFile["discoveredVia"]> = new Set<
  DiscoveredTsFile["discoveredVia"]
>(["tsconfig", "tsconfig-include-only", "adapter", "entry-glob", "workspace-walk"])

const CONTRIBUTES_INCLUDED: DiscoveredTsFile["discoveredVia"] = "tsconfig"

export type Resolver = {
  readonly resolve: (specifier: string, fromRelPath: string) => string | null
}

type Vantage =
  | { readonly kind: "repo"; readonly rel: string }
  | { readonly kind: "vendor-root" }
  | { readonly kind: "vendor-scope"; readonly scope: string }
  | { readonly kind: "unknown" }

const packageNameOf = (segments: readonly string[]): { name: string; used: number } | null => {
  const head = segments[0]
  if (head === undefined || head === "") return null
  if (!head.startsWith("@")) return { name: head, used: 1 }
  const second = segments[1]
  if (second === undefined) return null
  return { name: `${head}/${second}`, used: 2 }
}

const lookThrough = (rel: string, packageDirs: ReadonlyMap<string, string>): Vantage => {
  const segments = rel === "" ? [] : rel.split("/")
  let at = -1
  for (let index = segments.length - 1; index >= 0; index--) {
    if (segments[index] === VENDOR_DIR) {
      at = index
      break
    }
  }
  if (at === -1) return { kind: "repo", rel }
  const rest = segments.slice(at + 1)
  if (rest.length === 0) return { kind: "vendor-root" }
  const named = packageNameOf(rest)
  if (named === null) return { kind: "unknown" }
  const head = rest[0] ?? ""
  if (head.startsWith("@") && rest.length === 1) return { kind: "vendor-scope", scope: head }
  const dir = packageDirs.get(named.name)
  if (dir === undefined) return { kind: "unknown" }
  const tail = rest.slice(named.used)
  return { kind: "repo", rel: tail.length === 0 ? dir : `${dir}/${tail.join("/")}` }
}

const scopeIsKnown = (scope: string, packageDirs: ReadonlyMap<string, string>): boolean => {
  for (const name of packageDirs.keys()) {
    if (name.startsWith(`${scope}/`)) return true
  }
  return false
}

const withoutTrailingSeparator = (path: string): string => {
  let at = path.length
  while (at > 1 && path[at - 1] === SEPARATOR) at -= 1
  return at === path.length ? path : path.slice(0, at)
}

export function createWorkspaceResolver(
  reading: TreeReading,
  tsconfigRelPath: string,
  packageDirs: ReadonlyMap<string, string>,
  host: ts.ParseConfigHost = treeParseConfigHost(reading)
): Resolver | null {
  const parsed = parseTsconfigInTree(reading, tsconfigRelPath, host)
  if (parsed.options === null) return null
  const options = { ...parsed.options }
  if (options.moduleResolution === undefined) {
    options.moduleResolution = ts.ModuleResolutionKind.Bundler
  }

  const repoRoot = reading.root
  const toRel = (absPath: string): string => {
    const at = withoutTrailingSeparator(absPath)
    if (at === repoRoot) return ""
    if (at.startsWith(`${repoRoot}/`)) return at.slice(repoRoot.length + 1)
    return at.startsWith("/") ? at.slice(1) : at
  }
  const toAbs = (relPath: string): string => (relPath === "" ? repoRoot : `${repoRoot}/${relPath}`)
  const seenThrough = (absPath: string): Vantage => lookThrough(toRel(absPath), packageDirs)

  const moduleHost: ts.ModuleResolutionHost = {
    fileExists: (path) => {
      const seen = seenThrough(path)
      return seen.kind === "repo" && reading.hasFile(seen.rel)
    },
    readFile: (path) => {
      const seen = seenThrough(path)
      return seen.kind === "repo" ? (reading.read(seen.rel) ?? undefined) : undefined
    },
    directoryExists: (path) => {
      const seen = seenThrough(path)
      if (seen.kind === "repo") return reading.hasDir(seen.rel)
      if (seen.kind === "vendor-root") return true
      if (seen.kind === "vendor-scope") return scopeIsKnown(seen.scope, packageDirs)
      return false
    },
    getDirectories: () => [],
    realpath: (path) => {
      const seen = seenThrough(path)
      return seen.kind === "repo" ? toAbs(seen.rel) : path
    },
    getCurrentDirectory: () => repoRoot,
    useCaseSensitiveFileNames: () => true,
  }

  return {
    resolve: (specifier, fromRelPath) => {
      const result = ts.resolveModuleName(specifier, toAbs(fromRelPath), options, moduleHost)
      const target = result.resolvedModule?.resolvedFileName
      if (target === undefined) return null
      const seen = seenThrough(target)
      if (seen.kind !== "repo") return null
      if (seen.rel.split("/").includes(VENDOR_DIR)) return null
      return seen.rel
    },
  }
}

export function packageNamePrefix(specifier: string): string | null {
  if (specifier.length === 0) return null
  if (specifier.startsWith(".") || specifier.startsWith("/")) return null
  if (specifier.startsWith(DYNAMIC_IMPORT_SUFFIX_PREFIX)) return null
  if (specifier.startsWith("@")) {
    const firstSlash = specifier.indexOf("/")
    if (firstSlash === -1) return null
    const secondSlash = specifier.indexOf("/", firstSlash + 1)
    return secondSlash === -1 ? specifier : specifier.slice(0, secondSlash)
  }
  const firstSlash = specifier.indexOf("/")
  return firstSlash === -1 ? specifier : specifier.slice(0, firstSlash)
}

export type FileSpecifiers = {
  readonly reaching: readonly string[]
  readonly dynamicSuffixes: readonly string[]
}

export function specifiersIn(path: string, text: string): FileSpecifiers {
  const sourceFile = ts.createSourceFile(path, text, ts.ScriptTarget.ESNext, true)
  const reaching: string[] = []
  const dynamicSuffixes: string[] = []

  const visit = (node: ts.Node): undefined => {
    if (ts.isImportDeclaration(node)) {
      if (ts.isStringLiteral(node.moduleSpecifier)) reaching.push(node.moduleSpecifier.text)
      return
    }
    if (ts.isExportDeclaration(node)) {
      if (node.moduleSpecifier !== undefined && ts.isStringLiteral(node.moduleSpecifier)) {
        reaching.push(node.moduleSpecifier.text)
      }
      return
    }
    if (
      ts.isCallExpression(node) &&
      node.expression.kind === ts.SyntaxKind.ImportKeyword &&
      node.arguments[0] !== undefined
    ) {
      const arg = node.arguments[0]
      if (ts.isStringLiteral(arg)) {
        reaching.push(arg.text)
      } else if (ts.isTemplateExpression(arg)) {
        const lastSpan = arg.templateSpans[arg.templateSpans.length - 1]
        if (lastSpan !== undefined) {
          const tail = lastSpan.literal.text
          if (tail.length > 0 && tail.includes("/")) dynamicSuffixes.push(tail)
        }
      }
    }
    if (
      ts.isCallExpression(node) &&
      ts.isIdentifier(node.expression) &&
      node.expression.text === "require" &&
      node.arguments.length === 1
    ) {
      const arg = node.arguments[0]
      if (arg !== undefined && ts.isStringLiteral(arg)) reaching.push(arg.text)
    }
    ts.forEachChild(node, visit)
  }
  ts.forEachChild(sourceFile, visit)

  const augment = (node: ts.Node): undefined => {
    if (
      ts.isModuleDeclaration(node) &&
      ts.isStringLiteral(node.name) &&
      node.body !== undefined &&
      ts.isModuleBlock(node.body)
    ) {
      const specifier = node.name.text
      if (!specifier.includes("*")) {
        for (const statement of node.body.statements) {
          if (!ts.isInterfaceDeclaration(statement)) continue
          reaching.push(specifier)
          break
        }
      }
      return
    }
    ts.forEachChild(node, augment)
  }
  ts.forEachChild(sourceFile, augment)

  return { reaching, dynamicSuffixes }
}

type Site = {
  readonly workspace: string
  readonly pkg: string
}

const reach = (map: Map<string, Set<string>>, from: string, to: string): undefined => {
  const standing = map.get(from)
  if (standing === undefined) map.set(from, new Set([to]))
  else standing.add(to)
}

export function packageImportGraphsIn(reading: TreeReading): ImportGraphs {
  const workspaces: readonly Workspace[] = readTsWorkspaces(reading)
  const host = treeParseConfigHost(reading)

  const packageDirs = new Map<string, string>()
  const workspacePackageNames = new Set<string>()
  const workspacePathByName = new Map<string, string>()
  for (const ws of workspaces) {
    packageDirs.set(ws.packageName, ws.root)
    workspacePackageNames.add(ws.packageName)
    workspacePathByName.set(ws.packageName, ws.root)
  }

  const resolverByWs = new Map<string, Resolver>()
  for (const ws of workspaces) {
    const resolver = createWorkspaceResolver(
      reading,
      workspaceTsconfigPath(ws.root),
      packageDirs,
      host
    )
    if (resolver !== null) resolverByWs.set(ws.root, resolver)
  }

  const discovered = discoverWorkspaceTsFiles(reading)
  const siteByPath = new Map<string, Site>()
  for (const one of discovered) {
    siteByPath.set(one.relPath, { workspace: one.workspaceRoot, pkg: one.packageName })
  }

  const included = new Map<string, Set<string>>()
  const all = new Map<string, Set<string>>()

  const resolveDynamicSuffix = (suffix: string): string | null => {
    const normalized = suffix.startsWith("/") ? suffix.slice(1) : suffix
    if (normalized.length === 0) return null
    const trailing = `/${normalized}`
    for (const candidate of siteByPath.keys()) {
      if (candidate === normalized || candidate.endsWith(trailing)) return candidate
    }
    return null
  }

  for (const file of discovered) {
    if (!CONTRIBUTES_ALL.has(file.discoveredVia)) continue
    const source: Site = { workspace: file.workspaceRoot, pkg: file.packageName }
    const alsoIncluded = file.discoveredVia === CONTRIBUTES_INCLUDED
    const text = reading.read(file.relPath)
    if (text === null) continue
    const { reaching, dynamicSuffixes } = specifiersIn(file.relPath, text)
    const resolver = resolverByWs.get(file.workspaceRoot)

    const land = (target: Site | undefined): undefined => {
      if (target === undefined) return
      if (target.pkg === source.pkg) return
      if (target.workspace === source.workspace) return
      reach(all, source.workspace, target.workspace)
      if (alsoIncluded) reach(included, source.workspace, target.workspace)
    }

    for (const specifier of reaching) {
      const resolvedRel = resolver ? resolver.resolve(specifier, file.relPath) : null
      if (resolvedRel !== null && siteByPath.has(resolvedRel)) {
        land(siteByPath.get(resolvedRel))
        continue
      }
      const prefix = packageNamePrefix(specifier)
      if (prefix === null || !workspacePackageNames.has(prefix)) continue
      land({ workspace: workspacePathByName.get(prefix) ?? "", pkg: prefix })
    }

    for (const suffix of dynamicSuffixes) {
      const resolvedRel = resolveDynamicSuffix(suffix)
      if (resolvedRel === null) continue
      land(siteByPath.get(resolvedRel))
    }
  }

  return { included, all }
}
