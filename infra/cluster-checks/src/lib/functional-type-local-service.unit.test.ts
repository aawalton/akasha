import { afterEach, beforeEach, describe, expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"

import type { FunctionalType } from "../../../../../instructions/tools/lib/check-workflow/functional-type"
import { inferFunctionalType } from "./functional-type-discriminators.ts"
import { hasAppsWorkflowAtRoot } from "./functional-type-row-discriminators.ts"
import type { PackageJsonShape } from "./functional-type-shapes.ts"

const NO_WORKSPACE_DEPS: ReadonlyMap<string, FunctionalType> = new Map()

function writeSynth(dir: string, file: string, body: string): undefined {
  mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, file), body, "utf-8")
}

const DEPLOYMENT_BODY = `import {} from "cdk8s"
export default function synth() {
  return [{ kind: "Deployment", metadata: { name: "x" } }]
}
`

const CRONJOB_BODY = `export default () => [{ kind: "CronJob", metadata: { name: "x" } }]\n`

const TSTL_BLOCK = `{ "tstl": { "luaTarget": "5.1" } }\n`

describe("hasAppsWorkflowAtRoot", () => {
  let tmp: string

  beforeEach(() => {
    tmp = mkdtempSync(join(tmpdir(), "apps-workflow-"))
  })

  afterEach(() => {
    rmSync(tmp, { recursive: true, force: true })
  })

  test("no apps.workflow.ts at root → false", () => {
    expect(hasAppsWorkflowAtRoot(tmp)).toBe(false)
  })

  test("apps.workflow.ts at workspace root → true", () => {
    writeFileSync(join(tmp, "apps.workflow.ts"), "export const workflows = []\n", "utf-8")
    expect(hasAppsWorkflowAtRoot(tmp)).toBe(true)
  })

  test("apps.workflow.ts nested under src/ does NOT match (root only)", () => {
    mkdirSync(join(tmp, "src", "feature"), { recursive: true })
    writeFileSync(
      join(tmp, "src", "feature", "apps.workflow.ts"),
      "export const workflows = []\n",
      "utf-8"
    )
    expect(hasAppsWorkflowAtRoot(tmp)).toBe(false)
  })

  test("apps.workflow.ts nested under deploy/ does NOT match (root only)", () => {
    mkdirSync(join(tmp, "deploy"), { recursive: true })
    writeFileSync(join(tmp, "deploy", "apps.workflow.ts"), "export const workflows = []\n", "utf-8")
    expect(hasAppsWorkflowAtRoot(tmp)).toBe(false)
  })

  test("a similarly-named sibling does NOT match", () => {
    writeFileSync(join(tmp, "apps.workflow.tsx"), "export const workflows = []\n", "utf-8")
    writeFileSync(join(tmp, "apps.workflows.ts"), "export const workflows = []\n", "utf-8")
    expect(hasAppsWorkflowAtRoot(tmp)).toBe(false)
  })
})

describe("inferFunctionalType — local-service row", () => {
  let tmp: string

  beforeEach(() => {
    tmp = mkdtempSync(join(tmpdir(), "infer-local-service-"))
  })

  afterEach(() => {
    rmSync(tmp, { recursive: true, force: true })
  })

  function infer(
    pkg: PackageJsonShape,
    workspaceFunctionalTypes: ReadonlyMap<string, FunctionalType> = NO_WORKSPACE_DEPS
  ): string | null {
    return inferFunctionalType({
      pkg,
      name: undefined,
      workspaceDir: tmp,
      workspaceFunctionalTypes,
    })
  }

  test("apps.workflow.ts at root + no other discriminator matches → local-service", () => {
    writeFileSync(join(tmp, "apps.workflow.ts"), "export const workflows = []\n", "utf-8")
    expect(infer({})).toBe("local-service")
  })

  test("apps.workflow.ts present BUT k8s/synth.ts has Deployment → service wins", () => {
    writeFileSync(join(tmp, "apps.workflow.ts"), "export const workflows = []\n", "utf-8")
    writeSynth(join(tmp, "k8s"), "synth.ts", DEPLOYMENT_BODY)
    expect(infer({})).toBe("service")
  })

  test("apps.workflow.ts present BUT k8s/synth.ts has CronJob → worker wins", () => {
    writeFileSync(join(tmp, "apps.workflow.ts"), "export const workflows = []\n", "utf-8")
    writeSynth(join(tmp, "k8s"), "synth.ts", CRONJOB_BODY)
    expect(infer({})).toBe("worker")
  })

  test("apps.workflow.ts present BUT package declares bin → program wins", () => {
    writeFileSync(join(tmp, "apps.workflow.ts"), "export const workflows = []\n", "utf-8")
    expect(infer({ bin: "./cli.ts" })).toBe("program")
  })

  test("apps.workflow.ts present BUT package declares react → next-ui wins", () => {
    writeFileSync(join(tmp, "apps.workflow.ts"), "export const workflows = []\n", "utf-8")
    expect(infer({ dependencies: { react: "^18.0.0" } })).toBe("next-ui")
  })

  test("apps.workflow.ts present BUT package declares pg → access wins", () => {
    writeFileSync(join(tmp, "apps.workflow.ts"), "export const workflows = []\n", "utf-8")
    expect(infer({ dependencies: { pg: "^8.0.0" } })).toBe("access")
  })

  test("apps.workflow.ts present BUT the tsconfig carries a tstl block → addon wins", () => {
    writeFileSync(join(tmp, "apps.workflow.ts"), "export const workflows = []\n", "utf-8")
    writeFileSync(join(tmp, "tsconfig.json"), TSTL_BLOCK, "utf-8")
    expect(infer({})).toBe("addon")
  })

  test("no apps.workflow.ts and no other discriminator → falls through to pure (empty package)", () => {
    expect(infer({})).toBe("pure")
  })

  test("apps.workflow.ts at root takes precedence over the pure row even when source is pure", () => {
    writeFileSync(join(tmp, "apps.workflow.ts"), "export const workflows = []\n", "utf-8")
    expect(infer({})).toBe("local-service")
  })
})
