import { describe, expect, test } from "bun:test"
import { createGraph } from "../../../../tools/lib/graph/graph.ts"
import {
  CSS_FILE_NODE_TYPE,
  type CssFileAttrs,
} from "../../../../tools/lib/graph/producers/file/css-file/types.ts"
import {
  TS_FILE_NODE_TYPE,
  type TsFileAttrs,
} from "../../../../tools/lib/graph/producers/file/ts-file/types.ts"
import {
  type DeclaredDep,
  LOCKFILE_PACKAGE_NODE_TYPE,
  LOCKFILE_RESOLVES_EDGE_TYPE,
  type LockfilePackageAttrs,
  lockfilePackageKey,
  type LockfileResolvesAttrs,
  type WorkspaceDepKind,
} from "../../../../tools/lib/graph/producers/lockfile-package/types.ts"
import {
  PACKAGE_NODE_TYPE,
  type PackageAttrs,
  type PkgDependsKind,
} from "../../../../tools/lib/graph/producers/package/types.ts"
import type { Edge, Graph, Node } from "../../../../tools/lib/graph/types.ts"
import { examinePopulation } from "../../../../tools/lib/check-workflow/population"
import {
  computeTransitiveClosure,
  indexWorkspacesByName,
  workspaceInfoOf,
} from "./check-unused-deps-context.ts"
import { findingsForWorkspace } from "./check-unused-deps-credit.ts"
import { UnusedDepsFindingContractSchema } from "./check-unused-deps-json-contract.ts"
import type { Finding, RepoContext } from "./check-unused-deps-types.ts"
import { usageByWorkspace } from "./check-unused-deps-usage.ts"

const REPO = "code"

const node = (type: string, key: string, attrs: unknown): Node => ({
  id: `${type}:${REPO}:${key}`,
  type,
  repo: REPO,
  key,
  attrs,
  derived: {},
})

const edge = (type: string, from: string, to: string, attrs: unknown): Edge => ({
  type,
  from,
  to,
  attrs,
  derived: {},
})

interface PackageSpec {
  readonly name: string
  readonly path: string
  readonly dependencies?: Record<string, PkgDependsKind>
  readonly externalDependencies?: Record<string, readonly PkgDependsKind[]>
  readonly hasTsconfig?: boolean
  readonly commandUsages?: readonly string[]
  readonly nonTsSpecifiers?: readonly string[]
}

const pkg = (spec: PackageSpec): Node => {
  const attrs: PackageAttrs = {
    name: spec.name,
    path: spec.path,
    exports: null,
    hasTsconfig: spec.hasTsconfig ?? true,
    binCommands: [],
    commandUsages: spec.commandUsages ?? [],
    nonTsSpecifiers: spec.nonTsSpecifiers ?? [],
    configFileProtocols: [],
    configFileNames: [],
    sourceRoot: spec.path,
    dependencies: spec.dependencies ?? {},
    externalDependencies: spec.externalDependencies ?? {},
    tsconfigRefPaths: [],
    tstl: null,
  }
  return node(PACKAGE_NODE_TYPE, spec.name, attrs)
}

interface LockSpec {
  readonly name: string
  readonly version: string
  readonly binCommands?: readonly string[]
  readonly peers?: readonly string[]
}

const lock = (spec: LockSpec): Node => {
  const declaredDeps: DeclaredDep[] = (spec.peers ?? []).map((peer) => ({
    name: peer,
    kind: "peerDependencies",
    range: "*",
  }))
  const attrs: LockfilePackageAttrs = {
    name: spec.name,
    version: spec.version,
    integrity: "",
    declaredDeps,
    declaredOptionalPeers: [],
    binCommands: spec.binCommands ?? [],
    os: [],
    cpu: [],
  }
  return node(LOCKFILE_PACKAGE_NODE_TYPE, lockfilePackageKey(spec.name, spec.version), attrs)
}

const resolves = (wsName: string, depName: string, version: string, kind: WorkspaceDepKind): Edge => {
  const attrs: LockfileResolvesAttrs = { kind, range: "*" }
  return edge(
    LOCKFILE_RESOLVES_EDGE_TYPE,
    `${PACKAGE_NODE_TYPE}:${REPO}:${wsName}`,
    `${LOCKFILE_PACKAGE_NODE_TYPE}:${REPO}:${lockfilePackageKey(depName, version)}`,
    attrs
  )
}

const tsFile = (path: string, pkgName: string, specifiers: readonly string[]): Node => {
  const attrs: TsFileAttrs = {
    path,
    ext: ".ts",
    package: pkgName,
    workspaceRoot: "",
    discoveredVia: "workspace-walk",
    exports: [],
    imports: specifiers.map((specifier) => ({ specifier, typeOnly: false, kind: "static" })),
  }
  return node(TS_FILE_NODE_TYPE, path, attrs)
}

const cssFile = (path: string, pkgName: string, packageRefs: readonly string[]): Node => {
  const attrs: CssFileAttrs = { path, directives: [], package: pkgName, packageRefs }
  return node(CSS_FILE_NODE_TYPE, path, attrs)
}

function contextOf(graph: Graph, patchedDeps: readonly string[] = []): RepoContext {
  const workspaces = graph.nodes(PACKAGE_NODE_TYPE).map((n) => workspaceInfoOf(graph, n))
  const { population } = examinePopulation({
    members: workspaces,
    unit: "workspaces",
    labelOf: (ws) => ws.name,
    siteOf: () => null,
    examine: () => [],
    membership: { kind: "enumerated", because: "the fixture graph names every package node in it" },
  })
  return {
    codeRoot: "/fixture",
    treeSha: "fixture",
    workspaces,
    wsByName: indexWorkspacesByName(workspaces),
    closure: computeTransitiveClosure(workspaces),
    patchedDeps: new Set(patchedDeps),
    usageByRoot: usageByWorkspace(graph, workspaces),
    graph,
    population,
  }
}

const unused = (
  workspace: string,
  workspaceRoot: string,
  dep: string,
  depType: Finding["depType"]
): Finding => ({
  workspace,
  workspaceRoot,
  dep,
  depType,
  reason: "not used directly by this workspace",
})

function allFindings(ctx: RepoContext): readonly Finding[] {
  const found: Finding[] = []
  for (const ws of ctx.workspaces) found.push(...findingsForWorkspace(ws, ctx))
  return found
}

describe("check-unused-deps credit", () => {
  test("a declared dep a ts file in the workspace imports is credited", () => {
    const graph = createGraph(
      [
        pkg({ name: "@fix/app", path: "app", externalDependencies: { "live-dep": ["dependencies"] } }),
        tsFile("app/src/main.ts", "@fix/app", ["live-dep/sub"]),
        lock({ name: "live-dep", version: "1.0.0" }),
      ],
      [resolves("@fix/app", "live-dep", "1.0.0", "dependencies")]
    )
    expect(allFindings(contextOf(graph))).toEqual([])
  })

  test("a declared dep a css file in the workspace names is credited", () => {
    const graph = createGraph(
      [
        pkg({ name: "@fix/app", path: "app", externalDependencies: { "css-dep": ["dependencies"] } }),
        cssFile("app/src/main.css", "@fix/app", ["css-dep"]),
        lock({ name: "css-dep", version: "1.0.0" }),
      ],
      [resolves("@fix/app", "css-dep", "1.0.0", "dependencies")]
    )
    expect(allFindings(contextOf(graph))).toEqual([])
  })

  test("a declared dep the package node already carries as a non-ts specifier is credited", () => {
    const graph = createGraph(
      [
        pkg({
          name: "@fix/app",
          path: "app",
          externalDependencies: { "typed-dep": ["devDependencies"] },
          nonTsSpecifiers: ["typed-dep"],
        }),
        lock({ name: "typed-dep", version: "1.0.0" }),
      ],
      [resolves("@fix/app", "typed-dep", "1.0.0", "devDependencies")]
    )
    expect(allFindings(contextOf(graph))).toEqual([])
  })

  test("a declared dep nothing references is one finding, carrying the kind it was declared under", () => {
    const graph = createGraph(
      [
        pkg({ name: "@fix/app", path: "app", externalDependencies: { "dead-dep": ["devDependencies"] } }),
        lock({ name: "dead-dep", version: "1.0.0" }),
      ],
      [resolves("@fix/app", "dead-dep", "1.0.0", "devDependencies")]
    )
    expect(allFindings(contextOf(graph))).toEqual([
      unused("@fix/app", "app", "dead-dep", "devDependencies"),
    ])
  })

  test("a dep only a workspace beneath this one imports is NOT credited to this one", () => {
    const graph = createGraph(
      [
        pkg({
          name: "@fix/app",
          path: "app",
          dependencies: { "@fix/lib": "dependencies" },
          externalDependencies: { "shared-dep": ["dependencies"] },
        }),
        pkg({ name: "@fix/lib", path: "lib", externalDependencies: { "shared-dep": ["dependencies"] } }),
        tsFile("lib/src/main.ts", "@fix/lib", ["shared-dep"]),
        lock({ name: "shared-dep", version: "1.0.0" }),
      ],
      [
        resolves("@fix/app", "shared-dep", "1.0.0", "dependencies"),
        resolves("@fix/lib", "shared-dep", "1.0.0", "dependencies"),
      ]
    )
    expect(allFindings(contextOf(graph))).toEqual([
      unused("@fix/app", "app", "shared-dep", "dependencies"),
    ])
  })

  test("a dep the workspace also lists in its own peerDependencies is credited", () => {
    const graph = createGraph(
      [
        pkg({
          name: "@fix/app",
          path: "app",
          externalDependencies: { "peer-dep": ["dependencies", "peerDependencies"] },
        }),
        lock({ name: "peer-dep", version: "1.0.0" }),
      ],
      [resolves("@fix/app", "peer-dep", "1.0.0", "dependencies")]
    )
    expect(allFindings(contextOf(graph))).toEqual([])
  })

  test("a dep another declared dep names as a peer is credited", () => {
    const graph = createGraph(
      [
        pkg({
          name: "@fix/app",
          path: "app",
          externalDependencies: { host: ["dependencies"], plugin: ["dependencies"] },
        }),
        tsFile("app/src/main.ts", "@fix/app", ["plugin"]),
        lock({ name: "host", version: "1.0.0" }),
        lock({ name: "plugin", version: "1.0.0", peers: ["host"] }),
      ],
      [
        resolves("@fix/app", "host", "1.0.0", "dependencies"),
        resolves("@fix/app", "plugin", "1.0.0", "dependencies"),
      ]
    )
    expect(allFindings(contextOf(graph))).toEqual([])
  })

  test("peer credit reads the version THIS workspace resolves, not another workspace's", () => {
    const graph = createGraph(
      [
        pkg({
          name: "@fix/old",
          path: "old",
          externalDependencies: { host: ["dependencies"], plugin: ["dependencies"] },
        }),
        pkg({
          name: "@fix/new",
          path: "new",
          externalDependencies: { host: ["dependencies"], plugin: ["dependencies"] },
        }),
        tsFile("old/src/main.ts", "@fix/old", ["plugin"]),
        tsFile("new/src/main.ts", "@fix/new", ["plugin"]),
        lock({ name: "host", version: "1.0.0" }),
        lock({ name: "plugin", version: "1.0.0" }),
        lock({ name: "plugin", version: "2.0.0", peers: ["host"] }),
      ],
      [
        resolves("@fix/old", "host", "1.0.0", "dependencies"),
        resolves("@fix/old", "plugin", "1.0.0", "dependencies"),
        resolves("@fix/new", "host", "1.0.0", "dependencies"),
        resolves("@fix/new", "plugin", "2.0.0", "dependencies"),
      ]
    )
    expect(allFindings(contextOf(graph))).toEqual([
      unused("@fix/old", "old", "host", "dependencies"),
    ])
  })

  test("a declared dep whose bin command the workspace runs is credited", () => {
    const graph = createGraph(
      [
        pkg({
          name: "@fix/app",
          path: "app",
          externalDependencies: { "tool-dep": ["devDependencies"] },
          commandUsages: ["tool"],
        }),
        lock({ name: "tool-dep", version: "1.0.0", binCommands: ["tool"] }),
      ],
      [resolves("@fix/app", "tool-dep", "1.0.0", "devDependencies")]
    )
    expect(allFindings(contextOf(graph))).toEqual([])
  })

  test("bin credit reads the version THIS workspace resolves, not another workspace's", () => {
    const graph = createGraph(
      [
        pkg({
          name: "@fix/old",
          path: "old",
          externalDependencies: { "tool-dep": ["devDependencies"] },
          commandUsages: ["tool"],
        }),
        pkg({
          name: "@fix/new",
          path: "new",
          externalDependencies: { "tool-dep": ["devDependencies"] },
          commandUsages: ["tool"],
        }),
        lock({ name: "tool-dep", version: "1.0.0" }),
        lock({ name: "tool-dep", version: "2.0.0", binCommands: ["tool"] }),
      ],
      [
        resolves("@fix/old", "tool-dep", "1.0.0", "devDependencies"),
        resolves("@fix/new", "tool-dep", "2.0.0", "devDependencies"),
      ]
    )
    expect(allFindings(contextOf(graph))).toEqual([
      unused("@fix/old", "old", "tool-dep", "devDependencies"),
    ])
  })

  test("a dep named in the root patchedDependencies is credited at the root and nowhere else", () => {
    const graph = createGraph(
      [
        pkg({ name: "<root>", path: "", externalDependencies: { "patched-dep": ["devDependencies"] } }),
        pkg({ name: "@fix/app", path: "app", externalDependencies: { "patched-dep": ["devDependencies"] } }),
        lock({ name: "patched-dep", version: "1.0.0" }),
      ],
      [
        resolves("<root>", "patched-dep", "1.0.0", "devDependencies"),
        resolves("@fix/app", "patched-dep", "1.0.0", "devDependencies"),
      ]
    )
    expect(allFindings(contextOf(graph, ["patched-dep"]))).toEqual([
      unused("@fix/app", "app", "patched-dep", "devDependencies"),
    ])
  })

  test("an unused dep declared at the repo root is reported once, against the empty root path", () => {
    const graph = createGraph(
      [
        pkg({ name: "<root>", path: "", externalDependencies: { "dead-root-dep": ["devDependencies"] } }),
        lock({ name: "dead-root-dep", version: "1.0.0" }),
      ],
      [resolves("<root>", "dead-root-dep", "1.0.0", "devDependencies")]
    )
    expect(allFindings(contextOf(graph))).toEqual([
      unused("<root>", "", "dead-root-dep", "devDependencies"),
    ])
  })

  test("a workspace-internal dep is never a finding, whatever else stands", () => {
    const graph = createGraph(
      [
        pkg({ name: "@fix/app", path: "app", dependencies: { "@fix/lib": "dependencies" } }),
        pkg({ name: "@fix/lib", path: "lib" }),
      ],
      []
    )
    expect(allFindings(contextOf(graph))).toEqual([])
  })

  test("every finding the check emits parses under the contract it publishes", () => {
    const graph = createGraph(
      [
        pkg({ name: "@fix/app", path: "app", externalDependencies: { "dead-dep": ["dependencies"] } }),
        lock({ name: "dead-dep", version: "1.0.0" }),
      ],
      [resolves("@fix/app", "dead-dep", "1.0.0", "dependencies")]
    )
    const findings = allFindings(contextOf(graph))
    expect(findings).toHaveLength(1)
    for (const finding of findings) {
      expect(UnusedDepsFindingContractSchema.safeParse(finding).success).toBe(true)
    }
  })

  test("the denominator is every package node the graph holds", () => {
    const graph = createGraph(
      [
        pkg({ name: "<root>", path: "" }),
        pkg({ name: "@fix/app", path: "app" }),
        pkg({ name: "@fix/lib", path: "lib" }),
      ],
      []
    )
    const ctx = contextOf(graph)
    expect(ctx.workspaces).toHaveLength(3)
    expect(ctx.population.examined).toHaveLength(3)
    expect(ctx.population.unexaminable).toEqual([])
  })
})
