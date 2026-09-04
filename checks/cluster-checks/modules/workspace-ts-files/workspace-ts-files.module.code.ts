import { posix } from "node:path"
import ts from "typescript"
import { z } from "zod"
import {
  ADAPTER_PATTERNS,
  isUnder,
  matchGlob,
  scanFiles,
  walkTsFiles,
} from "../tree-globs/tree-globs.module.code.ts"
import type { TreeReading } from "../tree-reading/tree-reading.module.code.ts"
import { workspaceDirsIn } from "../workspace-packages/workspace-packages.module.code.ts"

// The curation stands beside this module, which is its only reader.
const CURATION_DIR = "akasha/checks/cluster-checks/modules/workspace-ts-files"

const CURATION_FILE = `${CURATION_DIR}/ast-unused.config.json`

export type TsFileDiscoveredVia =
  | "tsconfig"
  | "tsconfig-include-only"
  | "adapter"
  | "entry-glob"
  | "workspace-walk"

export type DiscoveredTsFile = {
  readonly relPath: string
  readonly packageName: string
  readonly workspaceRoot: string
  readonly discoveredVia: TsFileDiscoveredVia
}

export type WorkspaceGlobs = {
  readonly project: readonly string[]
  readonly entry: readonly string[]
  readonly ignore: readonly string[]
}

export const DEFAULT_WORKSPACE_GLOBS: WorkspaceGlobs = {
  entry: ["src/**/*.{ts,tsx}"],
  project: ["**/*.{ts,tsx}"],
  ignore: [],
}

const WORKSPACE_PACKAGE_JSON_SCHEMA = z.object({ name: z.string().optional() }).passthrough()

const CURATION_SCHEMA = z
  .object({
    workspaces: z.record(z.string(), z.unknown()).optional(),
    parts: z.array(z.string()).optional(),
  })
  .passthrough()

const CURATED_GLOBS_SCHEMA = z
  .object({
    entry: z.array(z.string()).optional(),
    project: z.array(z.string()).optional(),
    ignore: z.array(z.string()).optional(),
  })
  .passthrough()

export type Workspace = {
  readonly root: string
  readonly packageName: string
}

export function readTsWorkspaces(reading: TreeReading): readonly Workspace[] {
  const out: Workspace[] = []
  for (const wsRoot of workspaceDirsIn(reading)) {
    const raw = reading.read(`${wsRoot}/package.json`)
    if (raw === null) continue
    let name: string | undefined
    try {
      name = WORKSPACE_PACKAGE_JSON_SCHEMA.parse(JSON.parse(raw)).name
    } catch {
      continue
    }
    if (name === undefined) continue
    out.push({ root: wsRoot, packageName: name })
  }
  return out
}

const readCuration = (relPath: string, raw: string): z.infer<typeof CURATION_SCHEMA> => {
  let parsed: unknown
  try {
    parsed = JSON.parse(raw)
  } catch {
    throw new Error(`${relPath} is not the JSON it has to be`)
  }
  const read = CURATION_SCHEMA.safeParse(parsed)
  if (!read.success) throw new Error(`${relPath} does not say which workspaces it curates`)
  return read.data
}

function curatedGlobs(reading: TreeReading): ReadonlyMap<string, WorkspaceGlobs> {
  const raw = reading.read(CURATION_FILE)
  if (raw === null) return new Map()
  const root = readCuration(CURATION_FILE, raw)
  const merged: Record<string, unknown> = { ...(root.workspaces ?? {}) }
  for (const part of root.parts ?? []) {
    const relPath = `${CURATION_DIR}/${part}`
    const partRaw = reading.read(relPath)
    if (partRaw === null) {
      throw new Error(
        `${CURATION_FILE} names the curation part ${part}, and the tree holds no such file — ` +
          "reading past it would drop every workspace that part curates and report what is left as the whole"
      )
    }
    Object.assign(merged, readCuration(relPath, partRaw).workspaces ?? {})
  }
  const read = z.record(z.string(), CURATED_GLOBS_SCHEMA).safeParse(merged)
  if (!read.success) throw new Error(`${CURATION_FILE} does not say what globs its workspaces take`)
  const out = new Map<string, WorkspaceGlobs>()
  for (const [root_, globs] of Object.entries(read.data)) {
    out.set(root_, {
      entry: globs.entry ?? DEFAULT_WORKSPACE_GLOBS.entry,
      project: globs.project ?? DEFAULT_WORKSPACE_GLOBS.project,
      ignore: globs.ignore ?? [],
    })
  }
  return out
}

export function workspaceGlobsFor(
  reading: TreeReading,
  workspaces: readonly Workspace[]
): ReadonlyMap<string, WorkspaceGlobs> {
  const curated = curatedGlobs(reading)
  const out = new Map<string, WorkspaceGlobs>()
  for (const ws of workspaces) out.set(ws.root, curated.get(ws.root) ?? DEFAULT_WORKSPACE_GLOBS)
  return out
}

export function workspaceTsconfigPath(workspaceRoot: string): string {
  return workspaceRoot === "" ? "tsconfig.json" : `${workspaceRoot}/tsconfig.json`
}

const hasWildcard = (spec: string): boolean => spec.includes("*") || spec.includes("?")

const namesADirectory = (spec: string): boolean => {
  if (hasWildcard(spec)) return false
  const slash = spec.lastIndexOf("/")
  const last = slash === -1 ? spec : spec.slice(slash + 1)
  return !last.includes(".")
}

const specMatches = (spec: string, relPath: string): boolean => {
  const cleaned = spec.startsWith("./") ? spec.slice(2) : spec
  if (cleaned === "") return false
  if (namesADirectory(cleaned)) {
    return relPath === cleaned || relPath.startsWith(`${cleaned}/`)
  }
  return matchGlob(cleaned, relPath)
}

const anySpecMatches = (specs: readonly string[], relPath: string): boolean => {
  for (const spec of specs) {
    if (specMatches(spec, relPath)) return true
  }
  return false
}

const hasAnyExtension = (relPath: string, extensions: readonly string[]): boolean => {
  if (extensions.length === 0) return true
  for (const extension of extensions) {
    if (relPath.endsWith(extension)) return true
  }
  return false
}

const depthOf = (relPath: string): number => relPath.split("/").length - 1

export function treeParseConfigHost(reading: TreeReading): ts.ParseConfigHost {
  const repoRoot = reading.root
  const toRel = (absPath: string): string => {
    if (absPath === repoRoot) return ""
    if (absPath.startsWith(`${repoRoot}/`)) return absPath.slice(repoRoot.length + 1)
    return absPath.startsWith("/") ? absPath.slice(1) : absPath
  }
  const toAbs = (relPath: string): string => (relPath === "" ? repoRoot : `${repoRoot}/${relPath}`)
  return {
    useCaseSensitiveFileNames: true,
    fileExists: (path) => reading.hasFile(toRel(path)),
    readFile: (path) => reading.read(toRel(path)) ?? undefined,
    readDirectory: (rootDir, extensions, excludes, includes, depth) => {
      const rootRel = toRel(rootDir)
      const under = rootRel === "" ? "" : `${rootRel}/`
      const resolveSpec = (spec: string): string => {
        const cleaned = spec.startsWith("./") ? spec.slice(2) : spec
        if (cleaned.startsWith("/")) return toRel(cleaned)
        return posix.normalize(`${under}${cleaned}`)
      }
      const excludeSpecs = excludes === undefined ? [] : excludes.map(resolveSpec)
      const includeSpecs = includes.map(resolveSpec)
      const out: string[] = []
      for (const relPath of reading.paths) {
        if (includeSpecs.length === 0 && under !== "" && !relPath.startsWith(under)) continue
        if (!hasAnyExtension(relPath, extensions)) continue
        if (depth !== undefined && relPath.startsWith(under)) {
          if (depthOf(relPath.slice(under.length)) > depth) continue
        }
        if (anySpecMatches(excludeSpecs, relPath)) continue
        if (includeSpecs.length > 0 && !anySpecMatches(includeSpecs, relPath)) continue
        out.push(toAbs(relPath))
      }
      return out
    },
  }
}

export type TsconfigParseResult = {
  readonly fileNames: readonly string[]
  readonly includeOnlyFileNames: readonly string[]
  readonly options: ts.CompilerOptions | null
}

const EMPTY_PARSE: TsconfigParseResult = {
  fileNames: [],
  includeOnlyFileNames: [],
  options: null,
}

export function parseTsconfigInTree(
  reading: TreeReading,
  tsconfigRelPath: string,
  host: ts.ParseConfigHost = treeParseConfigHost(reading)
): TsconfigParseResult {
  if (!reading.hasFile(tsconfigRelPath)) return EMPTY_PARSE
  const repoRoot = reading.root
  const basePath =
    posix.dirname(tsconfigRelPath) === "."
      ? repoRoot
      : `${repoRoot}/${posix.dirname(tsconfigRelPath)}`
  const configFile = ts.readConfigFile(`${repoRoot}/${tsconfigRelPath}`, (path) =>
    host.readFile(path)
  )
  if (configFile.error) return EMPTY_PARSE
  const parsed = ts.parseJsonConfigFileContent(configFile.config, host, basePath)
  const rawExcludes: unknown = configFile.config?.exclude
  const hasExcludes =
    Array.isArray(rawExcludes) && rawExcludes.some((one) => typeof one === "string")

  let includeOnlyFileNames: readonly string[] = []
  if (hasExcludes) {
    const noExcludeParsed = ts.parseJsonConfigFileContent(
      { ...configFile.config, exclude: [] },
      host,
      basePath
    )
    const included = new Set(parsed.fileNames)
    includeOnlyFileNames = noExcludeParsed.fileNames.filter((one) => !included.has(one))
  }

  return { fileNames: parsed.fileNames, includeOnlyFileNames, options: parsed.options }
}

const relativeToRoot = (repoRoot: string, absPath: string): string | null => {
  if (absPath === repoRoot) return ""
  if (!absPath.startsWith(`${repoRoot}/`)) return null
  return absPath.slice(repoRoot.length + 1)
}

const collectFromTsconfig = (
  repoRoot: string,
  fileNames: readonly string[],
  rootRel: string,
  via: TsFileDiscoveredVia,
  seen: Map<string, TsFileDiscoveredVia>
): undefined => {
  for (const abs of fileNames) {
    const relPath = relativeToRoot(repoRoot, abs)
    if (relPath === null) continue
    if (!isUnder(relPath, rootRel)) continue
    if (relPath.split("/").includes("node_modules")) continue
    if (!seen.has(relPath)) seen.set(relPath, via)
  }
}

const collectMatches = (
  matches: readonly string[],
  via: TsFileDiscoveredVia,
  seen: Map<string, TsFileDiscoveredVia>
): undefined => {
  for (const relPath of matches) {
    if (!seen.has(relPath)) seen.set(relPath, via)
  }
}

export function discoverWorkspaceTsFiles(reading: TreeReading): readonly DiscoveredTsFile[] {
  const workspaces = readTsWorkspaces(reading)
  const paths = reading.files({ includeFixtures: true, includeGenerated: true })
  const globsByRoot = workspaceGlobsFor(reading, workspaces)
  const tracked = new Set(paths)
  const host = treeParseConfigHost(reading)

  const byFile = new Map<string, DiscoveredTsFile>()
  const keep = (found: DiscoveredTsFile): undefined => {
    const standing = byFile.get(found.relPath)
    if (standing === undefined || found.workspaceRoot.length > standing.workspaceRoot.length) {
      byFile.set(found.relPath, found)
    }
  }

  for (const ws of workspaces) {
    const { fileNames, includeOnlyFileNames } = parseTsconfigInTree(
      reading,
      workspaceTsconfigPath(ws.root),
      host
    )
    const globs = globsByRoot.get(ws.root)
    const seen = new Map<string, TsFileDiscoveredVia>()
    collectFromTsconfig(reading.root, fileNames, ws.root, "tsconfig", seen)
    collectMatches(scanFiles(paths, ws.root, "", ADAPTER_PATTERNS), "adapter", seen)
    collectMatches(scanFiles(paths, ws.root, ws.root, globs?.entry ?? []), "entry-glob", seen)
    collectFromTsconfig(reading.root, includeOnlyFileNames, ws.root, "tsconfig-include-only", seen)
    collectMatches(walkTsFiles(paths, ws.root), "workspace-walk", seen)
    for (const [relPath, via] of seen) {
      if (!tracked.has(relPath)) continue
      keep({ relPath, packageName: ws.packageName, workspaceRoot: ws.root, discoveredVia: via })
    }
  }

  for (const relPath of paths) {
    if (!relPath.endsWith(".ts") && !relPath.endsWith(".tsx")) continue
    if (relPath.split("/").includes("node_modules")) continue
    if (workspaces.some((ws) => isUnder(relPath, ws.root))) continue
    keep({ relPath, packageName: "code", workspaceRoot: "", discoveredVia: "workspace-walk" })
  }

  return [...byFile.values()]
}
