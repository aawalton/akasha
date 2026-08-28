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
      detectsBunRunStartCommand(`command: ["bun", "--watch", "x/src/server.ts"]`)
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
    "alanwalton/tower/web",
    "alanwalton/web",
    "temper/web",
  ]

  test("resolves nested deploy/k8s synth to its workspace", () => {
    expect(
      resolveOwningWorkspace("alanwalton/tower/web/deploy/k8s/synth.ts", workspaces)
    ).toBe("alanwalton/tower/web")
  })

  test("prefers the nearest ancestor when several ancestors are workspaces", () => {
    const ws = ["alanwalton/tower", "alanwalton/tower/web"]
    expect(resolveOwningWorkspace("alanwalton/tower/web/deploy/k8s/synth.ts", ws)).toBe(
      "alanwalton/tower/web"
    )
  })

  test("returns null when no ancestor is a workspace", () => {
    expect(resolveOwningWorkspace("orphan/k8s/synth.ts", workspaces)).toBe(null)
  })

  test("accepts a Set as the workspace collection", () => {
    expect(
      resolveOwningWorkspace("temper/web/temper-web-deployment.cluster-service.code.attachment.ts", new Set(workspaces))
    ).toBe("temper/web")
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
        synthPath: "temper/web/temper-web-deployment.cluster-service.code.attachment.ts",
        owningWorkspace: "temper/web",
        hasStartScript: true,
      },
    ]
    expect(findStartScriptViolations(sites)).toEqual([])
  })

  test("resolved owner missing a start script → MissingStartScript (the #13279 shape)", () => {
    const sites: StartContainerSite[] = [
      {
        synthPath: "alanwalton/tower/web/deploy/k8s/synth.ts",
        owningWorkspace: "alanwalton/tower/web",
        hasStartScript: false,
      },
    ]
    expect(findStartScriptViolations(sites)).toEqual([
      {
        kind: "MissingStartScript",
        synthPath: "alanwalton/tower/web/deploy/k8s/synth.ts",
        workspace: "alanwalton/tower/web",
      },
    ])
  })

  test("unresolved owner → UnresolvedWorkspace", () => {
    const sites: StartContainerSite[] = [
      { synthPath: "orphan/k8s/synth.ts", owningWorkspace: null, hasStartScript: false },
    ]
    expect(findStartScriptViolations(sites)).toEqual([
      { kind: "UnresolvedWorkspace", synthPath: "orphan/k8s/synth.ts" },
    ])
  })

  test("mixed ok + missing + unresolved → only violations surface, sorted by synthPath", () => {
    const sites: StartContainerSite[] = [
      {
        synthPath: "z/deploy/k8s/synth.ts",
        owningWorkspace: "z",
        hasStartScript: false,
      },
      {
        synthPath: "a/deploy/k8s/synth.ts",
        owningWorkspace: "a",
        hasStartScript: true,
      },
      { synthPath: "m/k8s/synth.ts", owningWorkspace: null, hasStartScript: false },
    ]
    const findings = findStartScriptViolations(sites)
    expect(kinds(findings)).toEqual(["UnresolvedWorkspace", "MissingStartScript"])
    expect(findings).toEqual([
      { kind: "UnresolvedWorkspace", synthPath: "m/k8s/synth.ts" },
      {
        kind: "MissingStartScript",
        synthPath: "z/deploy/k8s/synth.ts",
        workspace: "z",
      },
    ])
  })
})
