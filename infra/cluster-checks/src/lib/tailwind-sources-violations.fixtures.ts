import { createGraph } from "../../../../../instructions/tools/lib/graph/graph.ts"
import {
  type CssDirective,
  type CssFileAttrs,
  cssFileNodeId,
} from "../../../../../instructions/tools/lib/graph/producers/file/css-file/types.ts"
import {
  type PackageAttrs,
  PKG_DEPENDS_EDGE_TYPE,
  type PkgDependsAttrs,
  type PkgDependsKind,
  packageNodeId,
} from "../../../../../instructions/tools/lib/graph/producers/package/types.ts"
import type { Edge, Node } from "../../../../../instructions/tools/lib/graph/types.ts"
import {
  enumerateTailwindApps,
  examineTailwindApp,
  type FindTailwindSourcesViolationsInput,
  type TailwindSourceViolation,
} from "./tailwind-sources-violations.ts"

export const REPO_ROOT = "/repo"

const CODE_REPO = "code"

export const PACKAGE_NODE_TYPE = "package"
export const CSS_FILE_NODE_TYPE = "css-file"

export function packageNode(name: string, path: string): Node {
  const attrs: PackageAttrs = {
    name,
    path,
    exports: null,
    hasTsconfig: true,
    binCommands: [],
    commandUsages: [],
    nonTsSpecifiers: [],
    configFileProtocols: [],
    configFileNames: [],
    sourceRoot: path,
    dependencies: {},
    externalDependencies: {},
    tsconfigRefPaths: [],
    tstl: null,
  }
  return {
    id: packageNodeId(name),
    type: PACKAGE_NODE_TYPE,
    repo: CODE_REPO,
    key: name,
    attrs,
    derived: {},
  }
}

export function cssFileNode(
  relPath: string,
  directives: readonly CssDirective[],
  owner: string | null
): Node {
  const attrs: CssFileAttrs = { path: relPath, directives, package: owner, packageRefs: [] }
  return {
    id: cssFileNodeId(relPath),
    type: CSS_FILE_NODE_TYPE,
    repo: CODE_REPO,
    key: relPath,
    attrs,
    derived: {},
  }
}

export function pkgDependsEdge(from: string, to: string, kind: PkgDependsKind): Edge {
  const attrs: PkgDependsAttrs = { kind }
  return {
    type: PKG_DEPENDS_EDGE_TYPE,
    from: packageNodeId(from),
    to: packageNodeId(to),
    attrs,
    derived: {},
  }
}

export function directive(opts: {
  pattern: string
  line?: number
  resolvedBase?: string | null
  negated?: boolean
}): CssDirective {
  return {
    raw: `@source "${opts.pattern}";`,
    pattern: opts.pattern,
    line: opts.line ?? 1,
    negated: opts.negated ?? false,
    resolvedBase: opts.resolvedBase ?? null,
  }
}

export function makeInput(opts: {
  nodes: readonly Node[]
  edges?: readonly Edge[]
  packageSourceRootByName: ReadonlyMap<string, string>
  uiPackageNames: ReadonlySet<string>
  entryCssPaths: ReadonlySet<string>
}): FindTailwindSourcesViolationsInput {
  return {
    graph: createGraph(opts.nodes, opts.edges ?? []),
    repoRoot: REPO_ROOT,
    packageSourceRootByName: opts.packageSourceRootByName,
    uiPackageNames: opts.uiPackageNames,
    entryCssPaths: opts.entryCssPaths,
  }
}

export function examineAll(
  input: FindTailwindSourcesViolationsInput
): readonly TailwindSourceViolation[] {
  const out: TailwindSourceViolation[] = []
  for (const app of enumerateTailwindApps(input.graph, input.entryCssPaths)) {
    out.push(...examineTailwindApp(app, input))
  }
  return out
}
