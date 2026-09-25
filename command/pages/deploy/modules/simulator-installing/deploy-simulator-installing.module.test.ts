import { afterAll, expect, test } from "bun:test"
import { readFileSync } from "node:fs"
import { put } from "akasha/check/test/fixture/putting/putting.test-fixture.code.ts"
import { OperationalError } from "akasha/code/error/errors-core/modules/exit-code/exit-code.module.code.ts"
import type { Plan } from "akasha/code/ios-app/modules/app-building/app-building.module.code.ts"
import { said } from "akasha/code/spawning/modules/running/running.module.code.ts"
import {
  DATA,
  OPERATIONAL,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { rootOf } from "akasha/command/modules/rooting/rooting.module.code.ts"
import type { Running } from "akasha/command/pages/deploy/modules/simulator-installing/deploy-simulator-installing.module.code.ts"
import {
  installedBy,
  installedFrom,
  installedOnSimulator,
} from "akasha/command/pages/deploy/modules/simulator-installing/deploy-simulator-installing.module.code.ts"
import { scratchWorld } from "akasha/file/system/modules/scratching/scratching.module.code.ts"
import { listedFiled } from "akasha/page/index/test-fixtures/filing/index-filing.test-fixture.code.ts"

const root = rootOf(import.meta.dir)

const QUIET_ID = "01a05fd2-4c1e-7a3e-9b70-2c6a5d81f4e2"

const QUIET_AT = "akasha/quiet.ios-app.ts"

const QUIET_BODY =
  `export const quiet = { id: "${QUIET_ID}", type: "page-type/ios-app", slug: "quiet",` +
  ` definition: "an app naming no build script", bundleId: "me.quiet.app" }\n`

const scratch = scratchWorld()

afterAll(scratch.sweep)

function given(at: string): Given {
  return { root: at, calledAs: "akasha deploy", from: at, writer: null, agentId: null }
}

function committedIn(at: string): undefined {
  for (const one of [
    ["init", "-q", "-b", "main"],
    ["config", "user.email", "test@local"],
    ["config", "user.name", "test"],
    ["config", "commit.gpgsign", "false"],
    ["add", "-A"],
    ["commit", "-q", "-m", "quiet"],
  ]) {
    said(["git", ...one], { cwd: at })
  }
  return undefined
}

function namingNoBuildScript(): string {
  const at = scratch.rootFor("akasha-deploy-simulator-")
  put(at, QUIET_AT, QUIET_BODY)
  listedFiled(at, "ios-app", "quiet", [{ path: QUIET_AT, id: QUIET_ID }])
  committedIn(at)
  return at
}

const NAMING_ONE = QUIET_BODY.replace(" }\n", ', buildScript: "shell-script/build-sim" }\n')

const ROOT = "/nowhere"

const HOST = "macbook"

const PLAN: Plan = {
  appSlug: "quiet",
  shellPath: "akasha/quiet",
  buildScriptPath: "akasha/quiet/build.sh",
  syncScriptPath: "akasha/quiet/sync.sh",
  dependencies: {},
  deliverPaths: ["akasha/quiet"],
  deliverFiles: [],
  exports: [],
}

const TREE = "akasha/quiet under .akasha-ios-build on macbook"

const SCRIPT = "the build script under .akasha-ios-build on macbook"

function running(upTo: number): Running {
  let reached = 0
  return () => {
    reached += 1
    if (reached > upTo) throw new OperationalError(`the mac dropped run ${String(reached)}`)
    return { out: "", code: 0 }
  }
}

const working: Running = () => ({ out: "", code: 0 })

const failing: Running = () => ({ out: "no such commit", code: 1 })

const STAMP = "c0ffee"

function holdingBuildScript(): string {
  const at = scratch.rootFor("akasha-deploy-simulator-built-")
  put(at, "akasha/quiet/build.sh", "echo building\n")
  return at
}

test("an app no page is slugged for refuses at the data rather than the caller", async () => {
  const answer = await installedOnSimulator("nosuchapp", given(root), "HEAD")

  expect(answer.code).toBe(DATA)
  expect(answer.refusals.join(" ")).toContain("nosuchapp")
})

test("an app naming no build script refuses before reaching a machine", async () => {
  const answer = await installedOnSimulator("quiet", given(namingNoBuildScript()), "HEAD")

  expect(answer.code).toBe(DATA)
  expect(answer.refusals.join(" ")).toContain("build-script")
  expect(answer.report).toEqual([])
})

test("an app is read from the commit rather than from the checkout", async () => {
  const at = namingNoBuildScript()
  put(at, QUIET_AT, NAMING_ONE)

  const answer = await installedOnSimulator("quiet", given(at), "HEAD")

  expect(answer.refusals.join(" ")).toContain("build-script")
})

test("a commit whose files will not be written out refuses before reaching a machine", async () => {
  const answer = await installedOnSimulator("alanwalton", given(root), "HEAD", failing)

  expect(answer.code).toBe(OPERATIONAL)
  expect(answer.refusals.join(" ")).toContain("written out")
  expect(answer.report).toEqual([])
})

test("each thing this writes is named as soon as that thing reaches a machine", () => {
  const done: string[] = []

  expect(() => installedFrom(ROOT, PLAN, STAMP, HOST, running(2), done)).toThrow()
  expect(done).toEqual([TREE])
})

test("a run that threw part way names in its refusal each thing it had written", async () => {
  const held = await installedBy(ROOT, PLAN, STAMP, HOST, running(2))

  expect(held.code).toBe(OPERATIONAL)
  expect(held.report).toEqual([TREE])
  const last = held.refusals[held.refusals.length - 1] as string
  expect(last).toContain(TREE)
})

test("a run that threw before anything reached a machine names nothing", async () => {
  const held = await installedBy(ROOT, PLAN, STAMP, HOST, running(0))

  expect(held.report).toEqual([])
  expect(held.refusals.some((one) => one.includes("stopped part way"))).toBe(false)
})

test("a build is stamped with the commit its files were written out of", async () => {
  const at = holdingBuildScript()
  let sent = ""
  const keeping: Running = (command) => {
    const from = command[3]
    if (command[0] === "rsync" && from?.endsWith("build.sh") === true) {
      sent = readFileSync(from, "utf8")
    }
    return { out: "", code: 0 }
  }

  await installedBy(at, PLAN, STAMP, HOST, keeping)

  expect(sent).toContain(`export NATIVE_SHELL_STAMP_COMMIT='${STAMP}'`)
})

test("a build reporting no sentinel is refused with the script and the tree named", async () => {
  const at = holdingBuildScript()

  const held = await installedBy(at, PLAN, STAMP, HOST, working)

  expect(held.code).toBe(OPERATIONAL)
  expect(held.refusals[0]).toContain("BUILD_SIM_OK")
  const last = held.refusals[held.refusals.length - 1] as string
  expect(last).toContain(TREE)
  expect(last).toContain(SCRIPT)
})
