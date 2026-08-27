import { afterEach, beforeEach, describe, expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"

import type { FunctionalType } from "../../../../tools/lib/check-workflow/functional-type"
import { inferFunctionalType } from "./functional-type-discriminators.ts"
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

const STATEFULSET_BODY = `export default () => [{ kind: "StatefulSet", metadata: { name: "x" } }]\n`

const JOB_BODY = `export default () => [{ kind: "Job", metadata: { name: "x" } }]\n`

const CRONJOB_BODY = `export default () => [{ kind: "CronJob", metadata: { name: "x" } }]\n`

const RBAC_ONLY_BODY = `export default () => [
  { kind: "Namespace", metadata: { name: "x" } },
  { kind: "Role", metadata: { name: "x" } },
  { kind: "RoleBinding", metadata: { name: "x" } },
]
`

const TSTL_BLOCK = `{ "tstl": { "luaTarget": "5.1" } }\n`

const NO_TSTL_BLOCK = `{ "compilerOptions": { "strict": true } }\n`

const NODE_FS_SOURCE = `import { readFileSync } from "node:fs"\nexport const x = readFileSync\n`

describe("inferFunctionalType — service/worker rows via synth files", () => {
  let tmp: string

  beforeEach(() => {
    tmp = mkdtempSync(join(tmpdir(), "infer-functional-"))
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

  test("Deployment in deploy/k8s/synth.ts → service", () => {
    writeSynth(join(tmp, "deploy", "k8s"), "synth.ts", DEPLOYMENT_BODY)
    expect(infer({})).toBe("service")
  })

  test("StatefulSet in k8s/synth.ts → service", () => {
    writeSynth(join(tmp, "k8s"), "synth.ts", STATEFULSET_BODY)
    expect(infer({})).toBe("service")
  })

  test("CronJob in deploy/k8s/synth.ts → worker", () => {
    writeSynth(join(tmp, "deploy", "k8s"), "synth.ts", CRONJOB_BODY)
    expect(infer({})).toBe("worker")
  })

  test("Job in k8s/synth.ts → worker", () => {
    writeSynth(join(tmp, "k8s"), "synth.ts", JOB_BODY)
    expect(infer({})).toBe("worker")
  })

  test("synth file with both Deployment and CronJob → service (first match wins)", () => {
    writeSynth(join(tmp, "k8s"), "synth.ts", `${DEPLOYMENT_BODY}\n${CRONJOB_BODY}`)
    expect(infer({})).toBe("service")
  })

  test("no synth file → falls through to pure (empty package)", () => {
    expect(infer({})).toBe("pure")
  })

  test("synth file with no recognized kind → falls through to pure", () => {
    writeSynth(join(tmp, "k8s"), "synth.ts", RBAC_ONLY_BODY)
    expect(infer({})).toBe("pure")
  })

  test("multiple synth-*.ts files where one declares Deployment → service", () => {
    writeSynth(join(tmp, "k8s"), "synth.ts", RBAC_ONLY_BODY)
    writeSynth(join(tmp, "k8s"), "synth-loki.ts", DEPLOYMENT_BODY)
    expect(infer({})).toBe("service")
  })

  test("hostedBy declaration → service (without any k8s synth file)", () => {
    expect(infer({ hostedBy: "@infra/ci-orchestrator" })).toBe("service")
  })

  test("hostedBy with empty string is NOT a positive signal → falls through", () => {
    expect(infer({ hostedBy: "" })).toBe("pure")
  })

  test("hostedBy with non-string is NOT a positive signal → falls through", () => {
    expect(infer({ hostedBy: true })).toBe("pure")
    expect(infer({ hostedBy: 1 })).toBe("pure")
    expect(infer({ hostedBy: { host: "x" } })).toBe("pure")
  })

  test("hostedBy + k8s synth file → service (either signal suffices, dispatch order unchanged)", () => {
    writeSynth(join(tmp, "k8s"), "synth.ts", DEPLOYMENT_BODY)
    expect(infer({ hostedBy: "@infra/ci-orchestrator" })).toBe("service")
  })

  test("workspace dep declared program leaves the pure candidate unclassified (no match in chain)", () => {
    const pkg: PackageJsonShape = { dependencies: { "@shared/foo": "workspace:*" } }
    const map = new Map<string, FunctionalType>([["@shared/foo", "program"]])
    expect(infer(pkg, map)).toBeNull()
  })

  test("workspace dep declared pure leaves pure candidate as pure", () => {
    const pkg: PackageJsonShape = { dependencies: { "@shared/foo": "workspace:*" } }
    const map = new Map<string, FunctionalType>([["@shared/foo", "pure"]])
    expect(infer(pkg, map)).toBe("pure")
  })

  test("source importing node:fs with no other signal → io", () => {
    mkdirSync(join(tmp, "src"), { recursive: true })
    writeFileSync(join(tmp, "src", "atomic-write.ts"), NODE_FS_SOURCE, "utf-8")
    expect(infer({})).toBe("io")
  })

  test("source importing node:fs plus a bin field → program (io sits after the positive-signal rows)", () => {
    mkdirSync(join(tmp, "src"), { recursive: true })
    writeFileSync(join(tmp, "src", "cli.ts"), NODE_FS_SOURCE, "utf-8")
    expect(infer({ bin: { tool: "./src/cli.ts" } })).toBe("program")
  })

  test("io source with an impure workspace dep is still io (io keys on the scan only)", () => {
    mkdirSync(join(tmp, "src"), { recursive: true })
    writeFileSync(join(tmp, "src", "io.ts"), NODE_FS_SOURCE, "utf-8")
    const pkg: PackageJsonShape = { dependencies: { "@shared/foo": "workspace:*" } }
    const map = new Map<string, FunctionalType>([["@shared/foo", "program"]])
    expect(infer(pkg, map)).toBe("io")
  })

  test("workspace dep declared access carries the pure candidate to io", () => {
    const pkg: PackageJsonShape = { dependencies: { "@shared/bar": "workspace:*" } }
    const map = new Map<string, FunctionalType>([["@shared/bar", "access"]])
    expect(infer(pkg, map)).toBe("io")
  })

  test("non-workspace dep (not in map) is ignored by transitivity check", () => {
    const pkg: PackageJsonShape = { dependencies: { zod: "^3.0.0" } }
    expect(infer(pkg, new Map())).toBe("pure")
  })

  test("transitivity check inspects the three runtime dep groups; devDeps are exempt", () => {
    const pkgDev: PackageJsonShape = { devDependencies: { "@shared/foo": "workspace:*" } }
    const pkgPeer: PackageJsonShape = { peerDependencies: { "@shared/foo": "workspace:*" } }
    const pkgOpt: PackageJsonShape = { optionalDependencies: { "@shared/foo": "workspace:*" } }
    const map = new Map<string, FunctionalType>([["@shared/foo", "program"]])
    expect(infer(pkgDev, map)).toBe("pure")
    expect(infer(pkgPeer, map)).toBeNull()
    expect(infer(pkgOpt, map)).toBeNull()
  })

  test("addon row matches engines.vscode string (VSCode extension shape)", () => {
    expect(infer({ engines: { vscode: "^1.85.0" } })).toBe("addon")
    expect(infer({ engines: { vscode: 1 } })).toBe("pure")
    expect(infer({ engines: { vscode: "" } })).toBe("pure")
  })

  test("addon row matches a tstl block in the workspace tsconfig", () => {
    writeFileSync(join(tmp, "tsconfig.json"), TSTL_BLOCK, "utf-8")
    expect(infer({})).toBe("addon")
  })

  test("addon row matches a tstl block inherited through extends", () => {
    writeFileSync(join(tmp, "addons.base.json"), TSTL_BLOCK, "utf-8")
    writeFileSync(join(tmp, "tsconfig.json"), `{ "extends": "./addons.base.json" }\n`, "utf-8")
    expect(infer({})).toBe("addon")
  })

  test("addon row beats service row even when a Deployment synth file would match", () => {
    writeSynth(join(tmp, "k8s"), "synth.ts", DEPLOYMENT_BODY)
    writeFileSync(join(tmp, "tsconfig.json"), TSTL_BLOCK, "utf-8")
    expect(infer({})).toBe("addon")
  })

  test("addon row beats the io row even where the source reaches node:fs", () => {
    mkdirSync(join(tmp, "src"), { recursive: true })
    writeFileSync(join(tmp, "src", "io.ts"), NODE_FS_SOURCE, "utf-8")
    writeFileSync(join(tmp, "tsconfig.json"), TSTL_BLOCK, "utf-8")
    expect(infer({})).toBe("addon")
  })

  test("a workspace tsconfig with no tstl block leaves the chain to the later rows", () => {
    writeFileSync(join(tmp, "tsconfig.json"), NO_TSTL_BLOCK, "utf-8")
    expect(infer({})).toBe("pure")
  })

  test("program row reads a bin, and only where no library surface stands beside it", () => {
    expect(infer({ bin: { thing: "./src/cli.ts" } })).toBe("program")
    expect(infer({ bin: { thing: "./src/cli.ts" }, exports: { ".": "./src/index.ts" } })).toBe(
      "pure"
    )
    expect(infer({ bin: { thing: "./src/cli.ts" }, main: "./src/index.ts" })).toBe("pure")
  })

  test("the exit vocabulary alone makes nothing a program", () => {
    expect(infer({ dependencies: { "@shared/errors-core": "workspace:*" } })).not.toBe("program")
    expect(infer({ devDependencies: { "@shared/errors-core": "workspace:*" } })).not.toBe("program")
  })

  test("next-ui is read before program, so a React package carrying the vocabulary stays a UI", () => {
    expect(
      infer({ dependencies: { react: "^19.0.0", "@shared/errors-core": "workspace:*" } })
    ).toBe("next-ui")
  })

  test("next-ui row matches react in any dep group", () => {
    expect(infer({ devDependencies: { react: "^18.0.0" } })).toBe("next-ui")
    expect(infer({ optionalDependencies: { react: "^18.0.0" } })).toBe("next-ui")
  })

  test("access row matches pg or @supabase/* in any dep group", () => {
    expect(infer({ devDependencies: { pg: "^8.0.0" } })).toBe("access")
    expect(infer({ optionalDependencies: { pg: "^8.0.0" } })).toBe("access")
    expect(infer({ devDependencies: { "@supabase/supabase-js": "^2.0.0" } })).toBe("access")
    expect(infer({ optionalDependencies: { "@supabase/supabase-js": "^2.0.0" } })).toBe("access")
  })
})
