import { z } from "zod"
import type { TreeReading } from "../tree-reading/tree-reading.module.code.ts"

const MANIFEST = "package.json"

const GLOB_TAIL = "/*"

const ROOT_PACKAGE_KEY = "<root>"

const stringRecord = z.record(z.string(), z.string())

const PackageJsonSchema = z
  .object({
    name: z.string().optional(),
    workspaces: z.array(z.string()).optional(),
    dependencies: stringRecord.optional(),
    devDependencies: stringRecord.optional(),
    peerDependencies: stringRecord.optional(),
    optionalDependencies: stringRecord.optional(),
  })
  .passthrough()

const RootManifestSchema = z.object({ workspaces: z.array(z.string()).optional() }).passthrough()

export type PkgDependsKind =
  | "dependencies"
  | "devDependencies"
  | "peerDependencies"
  | "optionalDependencies"

const DEP_KINDS: readonly PkgDependsKind[] = [
  "dependencies",
  "devDependencies",
  "peerDependencies",
  "optionalDependencies",
]

export type WorkspacePackage = {
  readonly name: string
  readonly path: string
  readonly sourceRoot: string
  readonly hasTsconfig: boolean
  readonly dependencies: ReadonlyMap<string, PkgDependsKind>
}

export type TrailingStarGlob = {
  readonly prefix: string
  readonly depth: number
}

export function parseTrailingStarGlob(entry: string): TrailingStarGlob {
  let prefix = entry
  let depth = 0
  while (prefix.endsWith(GLOB_TAIL)) {
    prefix = prefix.slice(0, -GLOB_TAIL.length)
    depth += 1
  }
  if (depth === 0 || prefix.includes("*")) {
    throw new Error(
      `only a trailing "/*" is expanded, so the workspace entry \`${entry}\` is not one this reads`
    )
  }
  return { prefix, depth }
}

const dirsHoldingAManifest = (paths: readonly string[]): ReadonlySet<string> => {
  const dirs = new Set<string>()
  for (const path of paths) {
    if (!path.endsWith(`/${MANIFEST}`)) continue
    dirs.add(path.slice(0, -(MANIFEST.length + 1)))
  }
  return dirs
}

const depthOf = (path: string): number => path.split("/").length

export function workspaceDirsIn(reading: TreeReading): readonly string[] {
  if (!reading.hasFile(MANIFEST)) return []
  const raw = reading.read(MANIFEST)
  if (raw === null) return []
  const declared = RootManifestSchema.parse(JSON.parse(raw)).workspaces ?? []
  const holders = dirsHoldingAManifest(reading.paths)
  const out: string[] = []
  for (const entry of declared) {
    if (!entry.includes("*")) {
      if (holders.has(entry)) out.push(entry)
      continue
    }
    const { prefix, depth } = parseTrailingStarGlob(entry)
    const want = depthOf(prefix) + depth
    const matched: string[] = []
    for (const dir of holders) {
      if (!dir.startsWith(`${prefix}/`)) continue
      if (depthOf(dir) !== want) continue
      matched.push(dir)
    }
    matched.sort()
    out.push(...matched)
  }
  return out
}

const under = (path: string, name: string): string => (path === "" ? name : `${path}/${name}`)

export function readWorkspacePackages(reading: TreeReading): readonly WorkspacePackage[] {
  const rootRaw = reading.read(MANIFEST)
  if (rootRaw === null) {
    throw new Error(`the tree at ${reading.root} holds no root ${MANIFEST}`)
  }
  const rootPkg = PackageJsonSchema.parse(JSON.parse(rootRaw))

  type Raw = {
    readonly name: string
    readonly path: string
    readonly pkg: z.infer<typeof PackageJsonSchema>
  }
  const raws: Raw[] = []
  for (const wsPath of workspaceDirsIn(reading)) {
    const raw = reading.read(under(wsPath, MANIFEST))
    if (raw === null) continue
    let pkg: z.infer<typeof PackageJsonSchema>
    try {
      pkg = PackageJsonSchema.parse(JSON.parse(raw))
    } catch {
      continue
    }
    if (pkg.name === undefined) continue
    raws.push({ name: pkg.name, path: wsPath, pkg })
  }
  raws.push({ name: rootPkg.name ?? ROOT_PACKAGE_KEY, path: "", pkg: rootPkg })

  const workspaceNames = new Set(raws.map((raw) => raw.name))

  const out: WorkspacePackage[] = []
  for (const raw of raws) {
    const dependencies = new Map<string, PkgDependsKind>()
    for (const kind of DEP_KINDS) {
      for (const depName of Object.keys(raw.pkg[kind] ?? {})) {
        if (!workspaceNames.has(depName)) continue
        if (dependencies.has(depName)) continue
        dependencies.set(depName, kind)
      }
    }
    const srcDir = under(raw.path, "src")
    out.push({
      name: raw.name,
      path: raw.path,
      sourceRoot: reading.hasDir(srcDir) ? srcDir : raw.path,
      hasTsconfig: reading.hasFile(under(raw.path, "tsconfig.json")),
      dependencies,
    })
  }
  return out
}

export function transitiveWorkspaceDeps(
  packages: readonly WorkspacePackage[],
  from: string
): readonly string[] {
  const byName = new Map(packages.map((one) => [one.name, one]))
  if (!byName.has(from)) return []
  const reached = new Set<string>()
  const waiting: string[] = [...(byName.get(from)?.dependencies.keys() ?? [])]
  for (let one = waiting.shift(); one !== undefined; one = waiting.shift()) {
    if (one === from) continue
    if (reached.has(one)) continue
    if (!byName.has(one)) continue
    reached.add(one)
    waiting.push(...(byName.get(one)?.dependencies.keys() ?? []))
  }
  return [...reached].sort()
}

export function workspaceOwnerOf(
  relPath: string,
  packages: readonly WorkspacePackage[]
): string | null {
  const owners = packages.filter((one) => one.path !== "")
  owners.sort((one, two) => two.path.length - one.path.length)
  for (const one of owners) {
    if (relPath === one.path || relPath.startsWith(`${one.path}/`)) return one.name
  }
  return null
}
