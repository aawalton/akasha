import { existsSync, readFileSync } from "node:fs"
import { resolve } from "node:path"
import type { z } from "zod"
import { getWorkspaceDeps } from "../../../../../infra/scripts/src/generate-dockerfiles-deps.ts"
import { CODE_REPO } from "../../../../../repo/scope/scope.ts"
import { createEngine } from "../../../../../tools/lib/graph/engine.ts"
import { readAt } from "../../../../../tools/lib/graph/held-snapshot.ts"
import { fileNodeProducer } from "../../../../../tools/lib/graph/producers/file/file.node.producer.ts"
import {
  TS_FILE_NODE_TYPE,
  type TsFileAttrs,
} from "../../../../../tools/lib/graph/producers/file/ts-file/types.ts"
import { TsFileAttrsSchema } from "../../../../../tools/lib/graph/producers/file/ts-file/types-schemas.ts"
import { workspaceDirsAt } from "../../../../../tools/lib/graph/producers/lib/workspace-dirs.ts"
import { packageNodeProducer } from "../../../../../tools/lib/graph/producers/package/package.node.producer.ts"
import { extractPackageName } from "../../../../../tools/lib/graph/producers/package/scanner-helpers.ts"
import {
  PACKAGE_NODE_TYPE,
  PackageAttrsSchema,
} from "../../../../../tools/lib/graph/producers/package/types.ts"
import {
  applyRegistrars,
  PRODUCERS_DIR,
  registrarPaths,
} from "../../../../../tools/lib/graph/snapshot.ts"
import type { BuildContext, Graph } from "../../../../../tools/lib/graph/types.ts"
import {
  BUN_GLOBALS,
  DEP_FIELDS,
  NODE_BUILTINS,
  PKG_DEPS_SCHEMA,
  pathHasSkippedSegment,
  relPathWithinWorkspace,
  SKIP_SPECIFIERS,
} from "../check-phantom-deps-filters/check-phantom-deps-filters.module.code.ts"

const MANIFEST = "package.json"

export interface PackageImportInfo {
  readonly example: string
  typeOnly: boolean
}

export interface DeclaredDeps {
  readonly sites: ReadonlyMap<string, readonly string[]>
  readonly imageFollowed: ReadonlySet<string>
}

export interface WorkspaceData {
  readonly name: string
  readonly path: string
  readonly declared: DeclaredDeps
  readonly importedPackages: ReadonlyMap<string, PackageImportInfo>
}

export interface WorkspaceGraph {
  readonly workspaces: readonly WorkspaceData[]
  readonly workspaceNames: ReadonlySet<string>
  readonly leastWorkspaces: number
  readonly leastFrom: string
}

export async function buildReadGraph(ctx: BuildContext): Promise<Graph> {
  const engine = createEngine()
  await applyRegistrars(engine, registrarPaths(PRODUCERS_DIR))
  engine.registerProducer(packageNodeProducer)
  engine.registerProducer(fileNodeProducer)
  return engine.build(ctx)
}

export function readDeclaredDeps(repoRoot: string, wsPath: string): DeclaredDeps {
  const empty: DeclaredDeps = { sites: new Map(), imageFollowed: new Set() }
  const pkgJsonPath = resolve(repoRoot, wsPath, MANIFEST)
  if (!existsSync(pkgJsonPath)) return empty
  let pkg: z.infer<typeof PKG_DEPS_SCHEMA>
  try {
    pkg = PKG_DEPS_SCHEMA.parse(JSON.parse(readFileSync(pkgJsonPath, "utf-8")))
  } catch {
    return empty
  }
  const sites = new Map<string, string[]>()
  for (const field of DEP_FIELDS) {
    const deps = pkg[field]
    if (!deps) continue
    for (const [name, spec] of Object.entries(deps)) {
      const where = sites.get(name)
      const site = `${field} "${spec}"`
      if (where) where.push(site)
      else sites.set(name, [site])
    }
  }
  return { sites, imageFollowed: getWorkspaceDeps(pkgJsonPath) }
}

export function aggregateImports(
  tsFiles: readonly TsFileAttrs[]
): ReadonlyMap<string, PackageImportInfo> {
  const imports = new Map<string, PackageImportInfo>()
  for (const attrs of tsFiles) {
    const relWithinWs = relPathWithinWorkspace(attrs.path, attrs.workspaceRoot)
    if (pathHasSkippedSegment(relWithinWs)) continue

    for (const imp of attrs.imports) {
      const pkgName = extractPackageName(imp.specifier)
      if (pkgName == null) continue
      if (NODE_BUILTINS.has(pkgName)) continue
      if (BUN_GLOBALS.has(pkgName)) continue
      if (SKIP_SPECIFIERS.has(pkgName)) continue

      const existing = imports.get(pkgName)
      if (existing) {
        if (!imp.typeOnly) existing.typeOnly = false
      } else {
        imports.set(pkgName, { example: relWithinWs, typeOnly: imp.typeOnly })
      }
    }
  }
  return imports
}

function tsFilesByWorkspace(graph: Graph): ReadonlyMap<string, TsFileAttrs[]> {
  const byWorkspace = new Map<string, TsFileAttrs[]>()
  for (const node of graph.nodes(TS_FILE_NODE_TYPE)) {
    if (node.repo !== CODE_REPO) continue
    const attrs = TsFileAttrsSchema.parse(node.attrs)
    const bucket = byWorkspace.get(attrs.package)
    if (bucket === undefined) byWorkspace.set(attrs.package, [attrs])
    else bucket.push(attrs)
  }
  return byWorkspace
}

export async function loadWorkspaces(args: {
  readonly repoRoot: string
  readonly treeSha: string
}): Promise<WorkspaceGraph> {
  const { repoRoot, treeSha } = args
  const { ctx } = readAt(treeSha)
  const graph = await buildReadGraph(ctx)

  const packageNodes = graph
    .nodes(PACKAGE_NODE_TYPE)
    .map((node) => PackageAttrsSchema.parse(node.attrs))
  const byWorkspace = tsFilesByWorkspace(graph)

  const workspaces = packageNodes.map((attrs) => ({
    name: attrs.name,
    path: attrs.path,
    declared: readDeclaredDeps(repoRoot, attrs.path),
    importedPackages: aggregateImports(byWorkspace.get(attrs.name) ?? []),
  }))

  const declaredDirs = workspaceDirsAt(ctx, CODE_REPO)
  return {
    workspaces,
    workspaceNames: new Set(packageNodes.map((attrs) => attrs.name)),
    leastWorkspaces: declaredDirs.length + 1,
    leastFrom:
      `the \`workspaces\` globs in the code repo's root \`${MANIFEST}\` at tree ${treeSha}, ` +
      `which name ${declaredDirs.length} directories holding a manifest, plus the root workspace itself`,
  }
}
