import { relative, resolve } from "node:path"
import { buildFrom, readAt } from "../../../../tools/lib/graph/held-snapshot.ts"
import { IMPORT_DYNAMIC_EDGE_TYPE, IMPORT_STATIC_EDGE_TYPE, RE_EXPORT_EDGE_TYPE, TS_FILE_NODE_TYPES, tsFileNodeId } from "../../../../tools/lib/graph/producers/file/ts-file/types"
import { ImportDynamicAttrsSchema, ImportStaticAttrsSchema, ReExportAttrsSchema, TsFileAttrsSchema } from "../../../../tools/lib/graph/producers/file/ts-file/types-schemas"
import { DEFAULT_ADAPTERS } from "./ast-unused-adapters"
import { matchAny, roleFor } from "./ts-import-graph-globs"
import type {
  ModuleGraph,
  ModuleImport,
  ModuleNode,
  ModulePragmas,
  WorkspaceConfig,
} from "./ts-import-graph-types"

export async function buildGraphFromProducer(
  repoRoot: string,
  workspaces: readonly WorkspaceConfig[],
  treeSha: string
): Promise<ModuleGraph> {
  const warnings: string[] = []

  const producerGraph = await buildFrom(readAt(treeSha).ctx)

  const wsByRoot = new Map<string, WorkspaceConfig>(workspaces.map((w) => [w.root, w]))
  const adapters = [...DEFAULT_ADAPTERS]
  const modules = new Map<string, ModuleNode>()
  const entries = new Set<string>()

  for (const node of producerGraph.nodes(TS_FILE_NODE_TYPES)) {
    const attrs = TsFileAttrsSchema.parse(node.attrs)
    const ws = wsByRoot.get(attrs.workspaceRoot)
    if (ws === undefined) continue

    const absRoot = resolve(repoRoot, ws.root !== "" ? ws.root : ".")
    const abs = resolve(repoRoot, attrs.path)
    const wsRel = relative(absRoot, abs)

    if (attrs.discoveredVia === "tsconfig-include-only" && !matchAny(ws.entries, wsRel)) {
      continue
    }

    const isIgnored = ws.ignore.length > 0 && matchAny(ws.ignore, wsRel)
    const isInGeneratedDir = wsRel.startsWith("generated/") || wsRel.includes("/generated/")

    const pragmas: ModulePragmas = {
      file: null,
      lines: new Map(),
      invalid: [],
    }

    if (isIgnored && !pragmas.file) {
      pragmas.file = { reason: "workspace ignore glob", line: 0 }
    }
    if (isInGeneratedDir && !pragmas.file) {
      pragmas.file = { reason: "auto: generated/ folder", line: 0 }
    }

    let role = roleFor(attrs.path, adapters)
    const wildcardEntryGlobs = ws.entries.filter((g) => g.endsWith("!"))
    if (role === "source" && wildcardEntryGlobs.length > 0 && matchAny(wildcardEntryGlobs, wsRel)) {
      role = "entry"
    }

    const fromId = tsFileNodeId(attrs.path)
    const imports: ModuleImport[] = []
    for (const edge of producerGraph.outEdges(fromId)) {
      if (edge.type === IMPORT_STATIC_EDGE_TYPE) {
        const eAttrs = ImportStaticAttrsSchema.parse(edge.attrs)
        imports.push({
          specifier: eAttrs.specifier,
          resolvedPath: eAttrs.resolved === null ? null : resolve(repoRoot, eAttrs.resolved),
          importedNames: eAttrs.importedSymbols,
          typeOnly: eAttrs.typeOnly,
          dynamic: false,
          isReexport: false,
          line: 0,
        })
      } else if (edge.type === IMPORT_DYNAMIC_EDGE_TYPE) {
        const eAttrs = ImportDynamicAttrsSchema.parse(edge.attrs)
        imports.push({
          specifier: eAttrs.specifier,
          resolvedPath: eAttrs.resolved === null ? null : resolve(repoRoot, eAttrs.resolved),
          importedNames: ["*"],
          typeOnly: false,
          dynamic: true,
          isReexport: false,
          line: 0,
        })
      } else if (edge.type === RE_EXPORT_EDGE_TYPE) {
        const eAttrs = ReExportAttrsSchema.parse(edge.attrs)
        imports.push({
          specifier: eAttrs.specifier,
          resolvedPath: eAttrs.resolved === null ? null : resolve(repoRoot, eAttrs.resolved),
          importedNames: eAttrs.importedSymbols,
          reexportLocalNames: eAttrs.reexportLocalNames ?? undefined,
          typeOnly: eAttrs.typeOnly,
          dynamic: false,
          isReexport: true,
          line: 0,
        })
      }
    }

    const isConsumerOnly = attrs.discoveredVia === "workspace-walk" || !ws.audited

    const moduleNode: ModuleNode = {
      filePath: abs,
      relPath: attrs.path,
      workspaceRoot: ws.root,
      role,
      exports: attrs.exports,
      imports,
      pragmas,
      consumerOnly: isConsumerOnly || undefined,
    }
    modules.set(abs, moduleNode)
    if (matchAny(ws.entries, wsRel) && role !== "ignore") {
      entries.add(abs)
    }
    if (role === "entry") entries.add(abs)
  }

  return { modules, entries, warnings }
}
