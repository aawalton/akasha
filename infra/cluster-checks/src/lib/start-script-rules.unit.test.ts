import { describe, expect, test } from "bun:test"

import {
  detectsBunRunStartCommand,
  findStartScriptViolations,
  resolveOwningWorkspace,
  type StartContainerSite,
} from "./start-script-rules.ts"

type Finding = ReturnType<typeof findStartScriptViolations>[number]

describe("detectsBunRunStartCommand", () => {
  test("matches the canonical literal", () => {
    expect(detectsBunRunStartCommand(`command: ["bun", "run", "start"],`)).toBe(true)
  })

  test("matches with flexible whitespace and single quotes", () => {
    expect(detectsBunRunStartCommand(`command:[ 'bun' , 'run' , 'start' ]`)).toBe(true)
  })

  test("matches with a trailing comma before the bracket", () => {
    expect(detectsBunRunStartCommand(`command: ["bun","run","start",]`)).toBe(true)
  })

  test("does not match a direct-path command", () => {
    expect(detectsBunRunStartCommand(`command: ["bun", "run", "src/server.ts"]`)).toBe(false)
  })

  test("does not match a --watch direct path", () => {
    expect(
      detectsBunRunStartCommand(`command: ["bun", "--watch", "packages/x/src/server.ts"]`)
    ).toBe(false)
  })

  test("does not match the supervisor main.ts command", () => {
    expect(detectsBunRunStartCommand(`command: ["bun", entrypointPath("main.ts")]`)).toBe(false)
  })

  test("no command at all → false", () => {
    expect(detectsBunRunStartCommand(`image: "MUST_BE_SET_BY_DEPLOY"`)).toBe(false)
  })

  test("mismatched quote styles do not match (backreference)", () => {
    expect(detectsBunRunStartCommand(`command: ["bun', "run", "start"]`)).toBe(false)
  })
})

describe("resolveOwningWorkspace", () => {
  const workspaces = [
    "packages/alanwalton/tower/web",
    "packages/alanwalton/web",
    "packages/temper/web",
  ]

  test("resolves nested deploy/k8s synth to its workspace", () => {
    expect(
      resolveOwningWorkspace("packages/alanwalton/tower/web/deploy/k8s/synth.ts", workspaces)
    ).toBe("packages/alanwalton/tower/web")
  })

  test("prefers the nearest ancestor when several ancestors are workspaces", () => {
    const ws = ["packages/alanwalton/tower", "packages/alanwalton/tower/web"]
    expect(resolveOwningWorkspace("packages/alanwalton/tower/web/deploy/k8s/synth.ts", ws)).toBe(
      "packages/alanwalton/tower/web"
    )
  })

  test("returns null when no ancestor is a workspace", () => {
    expect(resolveOwningWorkspace("packages/orphan/k8s/synth.ts", workspaces)).toBe(null)
  })

  test("accepts a Set as the workspace collection", () => {
    expect(
      resolveOwningWorkspace("packages/temper/web/deploy/k8s/synth.ts", new Set(workspaces))
    ).toBe("packages/temper/web")
  })
})

function kinds(findings: readonly Finding[]): readonly string[] {
  return findings.map((f) => f.kind)
}

describe("findStartScriptViolations", () => {
  test("empty input → zero findings", () => {
    expect(findStartScriptViolations([])).toEqual([])
  })

  test("resolved owner with a start script → zero findings", () => {
    const sites: StartContainerSite[] = [
      {
        synthPath: "packages/temper/web/deploy/k8s/synth.ts",
        owningWorkspace: "packages/temper/web",
        hasStartScript: true,
      },
    ]
    expect(findStartScriptViolations(sites)).toEqual([])
  })

  test("resolved owner missing a start script → MissingStartScript (the #13279 shape)", () => {
    const sites: StartContainerSite[] = [
      {
        synthPath: "packages/alanwalton/tower/web/deploy/k8s/synth.ts",
        owningWorkspace: "packages/alanwalton/tower/web",
        hasStartScript: false,
      },
    ]
    expect(findStartScriptViolations(sites)).toEqual([
      {
        kind: "MissingStartScript",
        synthPath: "packages/alanwalton/tower/web/deploy/k8s/synth.ts",
        workspace: "packages/alanwalton/tower/web",
      },
    ])
  })

  test("unresolved owner → UnresolvedWorkspace", () => {
    const sites: StartContainerSite[] = [
      { synthPath: "packages/orphan/k8s/synth.ts", owningWorkspace: null, hasStartScript: false },
    ]
    expect(findStartScriptViolations(sites)).toEqual([
      { kind: "UnresolvedWorkspace", synthPath: "packages/orphan/k8s/synth.ts" },
    ])
  })

  test("mixed ok + missing + unresolved → only violations surface, sorted by synthPath", () => {
    const sites: StartContainerSite[] = [
      {
        synthPath: "packages/z/deploy/k8s/synth.ts",
        owningWorkspace: "packages/z",
        hasStartScript: false,
      },
      {
        synthPath: "packages/a/deploy/k8s/synth.ts",
        owningWorkspace: "packages/a",
        hasStartScript: true,
      },
      { synthPath: "packages/m/k8s/synth.ts", owningWorkspace: null, hasStartScript: false },
    ]
    const findings = findStartScriptViolations(sites)
    expect(kinds(findings)).toEqual(["UnresolvedWorkspace", "MissingStartScript"])
    expect(findings).toEqual([
      { kind: "UnresolvedWorkspace", synthPath: "packages/m/k8s/synth.ts" },
      {
        kind: "MissingStartScript",
        synthPath: "packages/z/deploy/k8s/synth.ts",
        workspace: "packages/z",
      },
    ])
  })
})
