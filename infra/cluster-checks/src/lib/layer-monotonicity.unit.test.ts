import { describe, expect, test } from "bun:test"

import {
  type Finding,
  findLayerViolations,
  judgeLayerMonotonicity,
  type LayerViolationInput,
  type PackageEdge,
  type WorkspaceEntry,
} from "./layer-monotonicity.ts"

const RANKS = new Map<string, number>([
  ["pure", 1],
  ["access", 2],
  ["next-ui", 4],
  ["next-app", 4],
  ["service", 4],
  ["worker", 4],
  ["program", 4],
  ["addon", 4],
  ["local-service", 4],
])

function input(opts: {
  workspaces: readonly WorkspaceEntry[]
  typeByPath: ReadonlyMap<string, string>
  edges?: readonly PackageEdge[]
}): LayerViolationInput {
  return {
    workspaces: opts.workspaces,
    typeByPath: opts.typeByPath,
    rankByType: RANKS,
    edges: opts.edges ?? [],
  }
}

function kinds(findings: readonly Finding[]): readonly string[] {
  return findings.map((f) => f.kind)
}

function runtimeEdge(source: string, target: string): PackageEdge {
  return { source, target, kind: "dependencies" }
}

function devEdge(source: string, target: string): PackageEdge {
  return { source, target, kind: "devDependencies" }
}

describe("findLayerViolations", () => {
  test("empty graph, empty workspaces → zero findings", () => {
    const out = findLayerViolations(input({ workspaces: [], typeByPath: new Map() }))
    expect(out).toEqual([])
  })

  test("single edge pure → access (rank 1 → 2) is a RankInversion", () => {
    const out = findLayerViolations(
      input({
        workspaces: [
          { name: "@x/core", path: "packages/x/core" },
          { name: "@x/access", path: "packages/x/access" },
        ],
        typeByPath: new Map([
          ["packages/x/core", "pure"],
          ["packages/x/access", "access"],
        ]),
        edges: [runtimeEdge("@x/core", "@x/access")],
      })
    )
    expect(out).toHaveLength(1)
    const finding = out[0]
    expect(finding?.kind).toBe("RankInversion")
    if (finding?.kind !== "RankInversion") throw new Error("unreachable")
    expect(finding.importer).toEqual({
      name: "@x/core",
      path: "packages/x/core",
      functionalType: "pure",
      rank: 1,
    })
    expect(finding.importee).toEqual({
      name: "@x/access",
      path: "packages/x/access",
      functionalType: "access",
      rank: 2,
    })
  })

  test("single edge next-ui → pure (rank 4 → 1) is allowed", () => {
    const out = findLayerViolations(
      input({
        workspaces: [
          { name: "@x/ui", path: "packages/x/ui" },
          { name: "@x/core", path: "packages/x/core" },
        ],
        typeByPath: new Map([
          ["packages/x/ui", "next-ui"],
          ["packages/x/core", "pure"],
        ]),
        edges: [runtimeEdge("@x/ui", "@x/core")],
      })
    )
    expect(out).toEqual([])
  })

  test("equal-rank edge program → service (rank 4 → 4) is allowed", () => {
    const out = findLayerViolations(
      input({
        workspaces: [
          { name: "@x/cli", path: "packages/x/cli" },
          { name: "@x/service", path: "packages/x/service" },
        ],
        typeByPath: new Map([
          ["packages/x/cli", "program"],
          ["packages/x/service", "service"],
        ]),
        edges: [runtimeEdge("@x/cli", "@x/service")],
      })
    )
    expect(out).toEqual([])
  })

  test("access → pure (rank 2 → 1) is allowed (the canonical access-uses-pure flow)", () => {
    const out = findLayerViolations(
      input({
        workspaces: [
          { name: "@x/access", path: "packages/x/access" },
          { name: "@x/core", path: "packages/x/core" },
        ],
        typeByPath: new Map([
          ["packages/x/access", "access"],
          ["packages/x/core", "pure"],
        ]),
        edges: [runtimeEdge("@x/access", "@x/core")],
      })
    )
    expect(out).toEqual([])
  })

  test("program → access (rank 4 → 2) is allowed (runtime-tier may depend on access)", () => {
    const out = findLayerViolations(
      input({
        workspaces: [
          { name: "@x/cli", path: "packages/x/cli" },
          { name: "@x/access", path: "packages/x/access" },
        ],
        typeByPath: new Map([
          ["packages/x/cli", "program"],
          ["packages/x/access", "access"],
        ]),
        edges: [runtimeEdge("@x/cli", "@x/access")],
      })
    )
    expect(out).toEqual([])
  })

  test("access → program (rank 2 → 4) is a RankInversion", () => {
    const out = findLayerViolations(
      input({
        workspaces: [
          { name: "@x/access", path: "packages/x/access" },
          { name: "@x/cli", path: "packages/x/cli" },
        ],
        typeByPath: new Map([
          ["packages/x/access", "access"],
          ["packages/x/cli", "program"],
        ]),
        edges: [runtimeEdge("@x/access", "@x/cli")],
      })
    )
    expect(kinds(out)).toEqual(["RankInversion"])
  })

  test("multiple rank inversions surface independently and are sorted by importer then importee", () => {
    const out = findLayerViolations(
      input({
        workspaces: [
          { name: "@x/core-a", path: "packages/x/core-a" },
          { name: "@x/core-b", path: "packages/x/core-b" },
          { name: "@x/access", path: "packages/x/access" },
          { name: "@x/ui", path: "packages/x/ui" },
        ],
        typeByPath: new Map([
          ["packages/x/core-a", "pure"],
          ["packages/x/core-b", "pure"],
          ["packages/x/access", "access"],
          ["packages/x/ui", "next-ui"],
        ]),
        edges: [
          runtimeEdge("@x/core-b", "@x/ui"),
          runtimeEdge("@x/core-a", "@x/access"),
          runtimeEdge("@x/access", "@x/ui"),
          runtimeEdge("@x/ui", "@x/core-a"),
        ],
      })
    )
    expect(kinds(out)).toEqual(["RankInversion", "RankInversion", "RankInversion"])
    const importers = out.flatMap((f) => (f.kind === "RankInversion" ? [f.importer.name] : []))
    expect(importers).toEqual(["@x/access", "@x/core-a", "@x/core-b"])
  })

  test("edge whose endpoint workspace lacks a functionalType is skipped (the gap belongs to check-functional-type)", () => {
    const out = findLayerViolations(
      input({
        workspaces: [
          { name: "@x/core", path: "packages/x/core" },
          { name: "@x/missing", path: "packages/x/missing" },
        ],
        typeByPath: new Map([["packages/x/core", "pure"]]),
        edges: [runtimeEdge("@x/core", "@x/missing")],
      })
    )
    expect(out).toEqual([])
  })

  test("edge whose type is unknown to rankByType is skipped silently", () => {
    const out = findLayerViolations(
      input({
        workspaces: [
          { name: "@x/a", path: "packages/x/a" },
          { name: "@x/b", path: "packages/x/b" },
        ],
        typeByPath: new Map([
          ["packages/x/a", "pure"],
          ["packages/x/b", "mystery"],
        ]),
        edges: [runtimeEdge("@x/a", "@x/b")],
      })
    )
    expect(out).toEqual([])
  })

  test("self-loop edges are checked but rank(u) >= rank(u) always holds, so allowed", () => {
    const out = findLayerViolations(
      input({
        workspaces: [{ name: "@x/core", path: "packages/x/core" }],
        typeByPath: new Map([["packages/x/core", "pure"]]),
        edges: [runtimeEdge("@x/core", "@x/core")],
      })
    )
    expect(out).toEqual([])
  })

  test("edge naming an unknown workspace name is skipped (no crash)", () => {
    const out = findLayerViolations(
      input({
        workspaces: [{ name: "@x/core", path: "packages/x/core" }],
        typeByPath: new Map([["packages/x/core", "pure"]]),
        edges: [runtimeEdge("@x/core", "@x/ghost")],
      })
    )
    expect(out).toEqual([])
  })

  test("devDependencies edge that would otherwise invert is exempted", () => {
    const out = findLayerViolations(
      input({
        workspaces: [
          { name: "@x/core", path: "packages/x/core" },
          { name: "@x/access", path: "packages/x/access" },
        ],
        typeByPath: new Map([
          ["packages/x/core", "pure"],
          ["packages/x/access", "access"],
        ]),
        edges: [devEdge("@x/core", "@x/access")],
      })
    )
    expect(out).toEqual([])
  })

  test("peerDependencies and optionalDependencies edges are runtime edges and ARE checked", () => {
    const peerOut = findLayerViolations(
      input({
        workspaces: [
          { name: "@x/core", path: "packages/x/core" },
          { name: "@x/cli", path: "packages/x/cli" },
        ],
        typeByPath: new Map([
          ["packages/x/core", "pure"],
          ["packages/x/cli", "program"],
        ]),
        edges: [{ source: "@x/core", target: "@x/cli", kind: "peerDependencies" }],
      })
    )
    expect(kinds(peerOut)).toEqual(["RankInversion"])

    const optOut = findLayerViolations(
      input({
        workspaces: [
          { name: "@x/core", path: "packages/x/core" },
          { name: "@x/cli", path: "packages/x/cli" },
        ],
        typeByPath: new Map([
          ["packages/x/core", "pure"],
          ["packages/x/cli", "program"],
        ]),
        edges: [{ source: "@x/core", target: "@x/cli", kind: "optionalDependencies" }],
      })
    )
    expect(kinds(optOut)).toEqual(["RankInversion"])
  })

  test("mixed-kind edge set: only the runtime inversion surfaces, the dev-edge is silent", () => {
    const out = findLayerViolations(
      input({
        workspaces: [
          { name: "@x/core", path: "packages/x/core" },
          { name: "@x/cli-runtime", path: "packages/x/cli-runtime" },
          { name: "@x/cli-test", path: "packages/x/cli-test" },
        ],
        typeByPath: new Map([
          ["packages/x/core", "pure"],
          ["packages/x/cli-runtime", "program"],
          ["packages/x/cli-test", "program"],
        ]),
        edges: [runtimeEdge("@x/core", "@x/cli-runtime"), devEdge("@x/core", "@x/cli-test")],
      })
    )
    expect(out).toHaveLength(1)
    const finding = out[0]
    if (finding?.kind !== "RankInversion") throw new Error("unreachable")
    expect(finding.importee.name).toBe("@x/cli-runtime")
  })
})

describe("judgeLayerMonotonicity judged edges", () => {
  const workspaces: readonly WorkspaceEntry[] = [
    { name: "@x/core", path: "packages/x/core" },
    { name: "@x/lib", path: "packages/x/lib" },
    { name: "@x/cli", path: "packages/x/cli" },
  ]
  const typeByPath = new Map([
    ["packages/x/core", "pure"],
    ["packages/x/lib", "access"],
    ["packages/x/cli", "program"],
  ])

  test("every runtime edge between typed, ranked workspaces is judged", () => {
    const edges = [runtimeEdge("@x/cli", "@x/lib"), runtimeEdge("@x/lib", "@x/core")]
    const out = judgeLayerMonotonicity(input({ workspaces, typeByPath, edges }))
    expect(out.findings).toHaveLength(0)
    expect(out.judgedEdges).toEqual(edges)
  })

  test("an edge that produced a finding is still a judged edge", () => {
    const out = judgeLayerMonotonicity(
      input({ workspaces, typeByPath, edges: [runtimeEdge("@x/core", "@x/cli")] })
    )
    expect(out.findings).toHaveLength(1)
    expect(out.judgedEdges).toEqual([runtimeEdge("@x/core", "@x/cli")])
  })

  test("a devDependencies edge is dropped before judgement, not judged", () => {
    const out = judgeLayerMonotonicity(
      input({ workspaces, typeByPath, edges: [devEdge("@x/core", "@x/cli")] })
    )
    expect(out.findings).toHaveLength(0)
    expect(out.judgedEdges).toEqual([])
  })

  test("an endpoint with no resolved type is dropped before judgement", () => {
    const out = judgeLayerMonotonicity(
      input({
        workspaces,
        typeByPath: new Map([
          ["packages/x/core", "pure"],
          ["packages/x/lib", "access"],
        ]),
        edges: [runtimeEdge("@x/lib", "@x/cli"), runtimeEdge("@x/lib", "@x/core")],
      })
    )
    expect(out.judgedEdges).toEqual([runtimeEdge("@x/lib", "@x/core")])
  })

  test("an edge naming a workspace outside the set is dropped before judgement", () => {
    const out = judgeLayerMonotonicity(
      input({ workspaces, typeByPath, edges: [runtimeEdge("@x/lib", "@x/absent")] })
    )
    expect(out.judgedEdges).toEqual([])
  })

  test("findLayerViolations returns the same findings the counting rule does", () => {
    const args = input({
      workspaces,
      typeByPath,
      edges: [runtimeEdge("@x/core", "@x/cli"), devEdge("@x/core", "@x/lib")],
    })
    expect(findLayerViolations(args)).toEqual(judgeLayerMonotonicity(args).findings)
  })
})
