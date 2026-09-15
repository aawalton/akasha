import { afterAll, expect, test } from "bun:test"
import { OperationalError } from "akasha/alan/harness/errors-core/modules/exit-code/exit-code.module.code.ts"
import { put } from "akasha/check/test/fixture/putting/putting.test-fixture.code.ts"
import type { Plan } from "akasha/code/ios-app/modules/app-building/app-building.module.code.ts"
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
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"
import { listedFiled } from "akasha/page/index/test-fixtures/filing/index-filing.test-fixture.code.ts"

const root = rootOf(import.meta.dir)

const QUIET_ID = "01a05fd2-4c1e-7a3e-9b70-2c6a5d81f4e2"

const QUIET_AT = "akasha/quiet.ios-app.ts"

const QUIET_BODY =
  `export const quiet = { id: "${QUIET_ID}", pageTypeSlug: "ios-app", slug: "quiet",` +
  ` definition: "an app naming no build script", bundleId: "me.quiet.app" }\n`

const scratch = scratchWorld()

afterAll(scratch.sweep)

function given(at: string): Given {
  return { root: at, calledAs: "akasha deploy", from: at, writer: null, agentId: null }
}

function namingNoBuildScript(): string {
  const at = scratch.rootFor("akasha-deploy-simulator-")
  put(at, QUIET_AT, QUIET_BODY)
  listedFiled(at, "ios-app", "quiet", [{ path: QUIET_AT, id: QUIET_ID }])
  return at
}

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

const stamped: Running = (command) => {
  if (command.includes("rev-parse")) return { out: "c0ffee\n", code: 0 }
  return { out: "", code: 0 }
}

function holdingBuildScript(): string {
  const at = scratch.rootFor("akasha-deploy-simulator-built-")
  put(at, "akasha/quiet/build.sh", "echo building\n")
  return at
}

test("an app no page is slugged for refuses at the data rather than the caller", async () => {
  const answer = await installedOnSimulator("nosuchapp", given(root))

  expect(answer.code).toBe(DATA)
  expect(answer.refusals.join(" ")).toContain("nosuchapp")
})

test("an app naming no build script refuses before reaching a machine", async () => {
  const answer = await installedOnSimulator("quiet", given(namingNoBuildScript()))

  expect(answer.code).toBe(DATA)
  expect(answer.refusals.join(" ")).toContain("build-script")
  expect(answer.report).toEqual([])
})

test("each thing this writes is named as soon as that thing reaches a machine", () => {
  const done: string[] = []

  expect(() => installedFrom(ROOT, PLAN, HOST, running(2), done)).toThrow()
  expect(done).toEqual([TREE])
})

test("a run that threw part way names in its refusal each thing it had written", async () => {
  const held = await installedBy(ROOT, PLAN, HOST, running(2))

  expect(held.code).toBe(OPERATIONAL)
  expect(held.report).toEqual([TREE])
  const last = held.refusals[held.refusals.length - 1] as string
  expect(last).toContain(TREE)
})

test("a run that threw before anything reached a machine names nothing", async () => {
  const held = await installedBy(ROOT, PLAN, HOST, running(0))

  expect(held.report).toEqual([])
  expect(held.refusals.some((one) => one.includes("stopped part way"))).toBe(false)
})

test("a commit that could not be read is refused with the tree already on the mac named", async () => {
  const held = await installedBy(ROOT, PLAN, HOST, working)

  expect(held.code).toBe(OPERATIONAL)
  const last = held.refusals[held.refusals.length - 1] as string
  expect(last).toContain(TREE)
})

test("a build reporting no sentinel is refused with the script and the tree named", async () => {
  const at = holdingBuildScript()

  const held = await installedBy(at, PLAN, HOST, stamped)

  expect(held.code).toBe(OPERATIONAL)
  expect(held.refusals[0]).toContain("BUILD_SIM_OK")
  const last = held.refusals[held.refusals.length - 1] as string
  expect(last).toContain(TREE)
  expect(last).toContain(SCRIPT)
})
