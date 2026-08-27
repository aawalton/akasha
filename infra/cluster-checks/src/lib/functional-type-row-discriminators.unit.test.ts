import { afterEach, beforeEach, describe, expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"

import {
  hasHostedByDecl,
  hasK8sSynthKind,
  hasTstlTsconfig,
} from "./functional-type-row-discriminators.ts"

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

const TSTL_BLOCK = `{ "tstl": { "luaTarget": "5.1", "luaLibImport": "require-minimal" } }\n`

const NO_TSTL_BLOCK = `{ "compilerOptions": { "strict": true } }\n`

describe("hasHostedByDecl", () => {
  test("returns true for non-empty string", () => {
    expect(hasHostedByDecl({ hostedBy: "@infra/ci-orchestrator" })).toBe(true)
    expect(hasHostedByDecl({ hostedBy: "x" })).toBe(true)
  })

  test("returns false for missing field", () => {
    expect(hasHostedByDecl({})).toBe(false)
  })

  test("returns false for empty string", () => {
    expect(hasHostedByDecl({ hostedBy: "" })).toBe(false)
  })

  test("returns false for non-string values (boolean / number / object / null)", () => {
    expect(hasHostedByDecl({ hostedBy: true })).toBe(false)
    expect(hasHostedByDecl({ hostedBy: 1 })).toBe(false)
    expect(hasHostedByDecl({ hostedBy: { host: "x" } })).toBe(false)
    expect(hasHostedByDecl({ hostedBy: null })).toBe(false)
    expect(hasHostedByDecl({ hostedBy: undefined })).toBe(false)
  })
})

describe("hasTstlTsconfig", () => {
  let tmp: string

  beforeEach(() => {
    tmp = mkdtempSync(join(tmpdir(), "tstl-tsconfig-"))
  })

  afterEach(() => {
    rmSync(tmp, { recursive: true, force: true })
  })

  test("no tsconfig at all → false", () => {
    expect(hasTstlTsconfig(tmp)).toBe(false)
  })

  test("tsconfig.json carrying a tstl block → true", () => {
    writeFileSync(join(tmp, "tsconfig.json"), TSTL_BLOCK, "utf-8")
    expect(hasTstlTsconfig(tmp)).toBe(true)
  })

  test("tsconfig.json with no tstl block → false", () => {
    writeFileSync(join(tmp, "tsconfig.json"), NO_TSTL_BLOCK, "utf-8")
    expect(hasTstlTsconfig(tmp)).toBe(false)
  })

  test("tsconfig.json extending a base that carries the tstl block → true", () => {
    mkdirSync(join(tmp, "shared"), { recursive: true })
    writeFileSync(join(tmp, "shared", "base.json"), TSTL_BLOCK, "utf-8")
    writeFileSync(
      join(tmp, "tsconfig.json"),
      `{ "extends": "./shared/base.json", "compilerOptions": { "strict": true } }\n`,
      "utf-8"
    )
    expect(hasTstlTsconfig(tmp)).toBe(true)
  })

  test("the tstl block found two links up the extends chain → true", () => {
    writeFileSync(join(tmp, "root.json"), TSTL_BLOCK, "utf-8")
    writeFileSync(join(tmp, "middle.json"), `{ "extends": "./root.json" }\n`, "utf-8")
    writeFileSync(join(tmp, "tsconfig.json"), `{ "extends": "./middle.json" }\n`, "utf-8")
    expect(hasTstlTsconfig(tmp)).toBe(true)
  })

  test("an extends target written without its .json suffix still resolves", () => {
    writeFileSync(join(tmp, "base.json"), TSTL_BLOCK, "utf-8")
    writeFileSync(join(tmp, "tsconfig.json"), `{ "extends": "./base" }\n`, "utf-8")
    expect(hasTstlTsconfig(tmp)).toBe(true)
  })

  test("an extends array matches on any entry carrying the tstl block", () => {
    writeFileSync(join(tmp, "plain.json"), NO_TSTL_BLOCK, "utf-8")
    writeFileSync(join(tmp, "lua.json"), TSTL_BLOCK, "utf-8")
    writeFileSync(
      join(tmp, "tsconfig.json"),
      `{ "extends": ["./plain.json", "./lua.json"] }\n`,
      "utf-8"
    )
    expect(hasTstlTsconfig(tmp)).toBe(true)
  })

  test("a bare package specifier in extends is not followed → false", () => {
    writeFileSync(join(tmp, "tsconfig.json"), `{ "extends": "@tsconfig/node20" }\n`, "utf-8")
    expect(hasTstlTsconfig(tmp)).toBe(false)
  })

  test("a tsconfig.base.json beside a plain tsconfig.json still matches", () => {
    writeFileSync(join(tmp, "tsconfig.json"), NO_TSTL_BLOCK, "utf-8")
    writeFileSync(join(tmp, "tsconfig.base.json"), TSTL_BLOCK, "utf-8")
    expect(hasTstlTsconfig(tmp)).toBe(true)
  })

  test("comments and trailing commas in the tsconfig do not hide the tstl block", () => {
    writeFileSync(
      join(tmp, "tsconfig.json"),
      `{\n  // lua output\n  "tstl": { "luaTarget": "5.1" },\n}\n`,
      "utf-8"
    )
    expect(hasTstlTsconfig(tmp)).toBe(true)
  })

  test("a json file that is not a tsconfig is not read", () => {
    writeFileSync(join(tmp, "package.json"), TSTL_BLOCK, "utf-8")
    writeFileSync(join(tmp, "addon.json"), TSTL_BLOCK, "utf-8")
    expect(hasTstlTsconfig(tmp)).toBe(false)
  })

  test("a tsconfig nested under src/ is not read (workspace root only)", () => {
    mkdirSync(join(tmp, "src"), { recursive: true })
    writeFileSync(join(tmp, "src", "tsconfig.json"), TSTL_BLOCK, "utf-8")
    expect(hasTstlTsconfig(tmp)).toBe(false)
  })

  test("an extends cycle terminates and reports no tstl block", () => {
    writeFileSync(join(tmp, "tsconfig.json"), `{ "extends": "./other.json" }\n`, "utf-8")
    writeFileSync(join(tmp, "other.json"), `{ "extends": "./tsconfig.json" }\n`, "utf-8")
    expect(hasTstlTsconfig(tmp)).toBe(false)
  })

  test("an extends target that is not there is passed over", () => {
    writeFileSync(join(tmp, "tsconfig.json"), `{ "extends": "./missing.json" }\n`, "utf-8")
    expect(hasTstlTsconfig(tmp)).toBe(false)
  })
})

describe("hasK8sSynthKind", () => {
  let tmp: string

  beforeEach(() => {
    tmp = mkdtempSync(join(tmpdir(), "k8s-synth-"))
  })

  afterEach(() => {
    rmSync(tmp, { recursive: true, force: true })
  })

  test("no k8s/ or deploy/k8s/ directory → false", () => {
    expect(hasK8sSynthKind(tmp, ["Deployment", "StatefulSet"])).toBe(false)
    expect(hasK8sSynthKind(tmp, ["Job", "CronJob"])).toBe(false)
  })

  test("k8s/synth.ts with Deployment → true for service kinds", () => {
    writeSynth(join(tmp, "k8s"), "synth.ts", DEPLOYMENT_BODY)
    expect(hasK8sSynthKind(tmp, ["Deployment", "StatefulSet"])).toBe(true)
    expect(hasK8sSynthKind(tmp, ["Job", "CronJob"])).toBe(false)
  })

  test("k8s/synth.ts with StatefulSet → true for service kinds", () => {
    writeSynth(join(tmp, "k8s"), "synth.ts", STATEFULSET_BODY)
    expect(hasK8sSynthKind(tmp, ["Deployment", "StatefulSet"])).toBe(true)
    expect(hasK8sSynthKind(tmp, ["Job", "CronJob"])).toBe(false)
  })

  test("deploy/k8s/synth.ts with CronJob → true for worker kinds", () => {
    writeSynth(join(tmp, "deploy", "k8s"), "synth.ts", CRONJOB_BODY)
    expect(hasK8sSynthKind(tmp, ["Job", "CronJob"])).toBe(true)
    expect(hasK8sSynthKind(tmp, ["Deployment", "StatefulSet"])).toBe(false)
  })

  test("deploy/k8s/synth.ts with Job → true for worker kinds", () => {
    writeSynth(join(tmp, "deploy", "k8s"), "synth.ts", JOB_BODY)
    expect(hasK8sSynthKind(tmp, ["Job", "CronJob"])).toBe(true)
    expect(hasK8sSynthKind(tmp, ["Deployment", "StatefulSet"])).toBe(false)
  })

  test("synth file with no recognized kind → false", () => {
    writeSynth(join(tmp, "k8s"), "synth.ts", RBAC_ONLY_BODY)
    expect(hasK8sSynthKind(tmp, ["Deployment", "StatefulSet"])).toBe(false)
    expect(hasK8sSynthKind(tmp, ["Job", "CronJob"])).toBe(false)
  })

  test("multiple synth-*.ts files where only one matches", () => {
    writeSynth(join(tmp, "k8s"), "synth.ts", RBAC_ONLY_BODY)
    writeSynth(join(tmp, "k8s"), "synth-loki.ts", DEPLOYMENT_BODY)
    writeSynth(join(tmp, "k8s"), "synth-constants.ts", "export const NS = 'x'\n")
    expect(hasK8sSynthKind(tmp, ["Deployment", "StatefulSet"])).toBe(true)
  })

  test("synth-*.ts pattern matched at deploy/k8s/ depth", () => {
    writeSynth(join(tmp, "deploy", "k8s"), "synth-cron.ts", CRONJOB_BODY)
    expect(hasK8sSynthKind(tmp, ["Job", "CronJob"])).toBe(true)
  })

  test("non-synth filenames inside k8s/ are ignored", () => {
    writeSynth(join(tmp, "k8s"), "helper.ts", DEPLOYMENT_BODY)
    writeSynth(join(tmp, "k8s"), "synthetic.ts", DEPLOYMENT_BODY)
    expect(hasK8sSynthKind(tmp, ["Deployment", "StatefulSet"])).toBe(false)
  })

  test("synth file under src/k8s/ is NOT scanned", () => {
    writeSynth(join(tmp, "src", "k8s"), "synth.ts", DEPLOYMENT_BODY)
    expect(hasK8sSynthKind(tmp, ["Deployment", "StatefulSet"])).toBe(false)
  })

  test("synth file at workspace root is NOT scanned", () => {
    writeSynth(tmp, "synth.ts", DEPLOYMENT_BODY)
    expect(hasK8sSynthKind(tmp, ["Deployment", "StatefulSet"])).toBe(false)
  })

  test("kind literal must use double quotes — single-quoted string ignored", () => {
    writeSynth(join(tmp, "k8s"), "synth.ts", "export default () => [{ kind: 'Deployment' }]\n")
    expect(hasK8sSynthKind(tmp, ["Deployment", "StatefulSet"])).toBe(false)
  })

  test("requesting only a subset of kinds restricts the regex", () => {
    writeSynth(join(tmp, "k8s"), "synth.ts", DEPLOYMENT_BODY)
    expect(hasK8sSynthKind(tmp, ["Job", "CronJob"])).toBe(false)
  })

  test("synth file with both Deployment and CronJob — caller decides ordering", () => {
    const body = `${DEPLOYMENT_BODY}\n${CRONJOB_BODY}`
    writeSynth(join(tmp, "k8s"), "synth.ts", body)
    expect(hasK8sSynthKind(tmp, ["Deployment", "StatefulSet"])).toBe(true)
    expect(hasK8sSynthKind(tmp, ["Job", "CronJob"])).toBe(true)
  })
})
