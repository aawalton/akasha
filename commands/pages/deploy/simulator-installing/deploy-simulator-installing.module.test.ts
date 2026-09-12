import { afterAll, expect, test } from "bun:test"
import { join } from "node:path"
import { OperationalError } from "akasha/alan/harness/errors-core/exit-code/exit-code.module.code.ts"
import type { Plan } from "akasha/code/ios-apps/app-building/app-building.module.code.ts"
import {
  DATA,
  OPERATIONAL,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import type { Running } from "akasha/commands/pages/deploy/simulator-installing/deploy-simulator-installing.module.code.ts"
import {
  installedBy,
  installedFrom,
  installedOnSimulator,
} from "akasha/commands/pages/deploy/simulator-installing/deploy-simulator-installing.module.code.ts"
import { listedFiled } from "akasha/pages/indexes/filing/index-filing.module.code.ts"
import { put } from "akasha/testing-system/putting/putting.module.code.ts"
import { scratchWorld } from "akasha/utils/fs/scratching/scratching.module.code.ts"

const root = join(import.meta.dir, "..", "..", "..")

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
  staging: { scriptPath: "akasha/quiet/stage.sh", sourcePath: "akasha/quiet/site" },
  deliverPaths: ["akasha/quiet"],
  deliverFiles: [],
  exports: [],
}

function stagedFrom(at: string): string {
  return `the site quiet serves, staged from ${join(at, "akasha/quiet/site")}`
}

const STAGED = stagedFrom(ROOT)

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

function staging(held: readonly string[]): readonly string[] {
  return held.filter((one) => one.includes("staged the site"))
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

  expect(() => installedFrom(ROOT, PLAN, HOST, running(3), done)).toThrow()
  expect(done).toEqual([STAGED, TREE])
})

test("a run that threw part way names in its refusal each thing it had written", async () => {
  const held = await installedBy(ROOT, PLAN, HOST, running(3))

  expect(held.code).toBe(OPERATIONAL)
  expect(held.report).toEqual([STAGED, TREE])
  const last = held.refusals[held.refusals.length - 1] as string
  expect(last).toContain(STAGED)
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
  expect(last).toContain(STAGED)
  expect(last).toContain(TREE)
})

test("a build reporting no sentinel is refused with the script and the tree named", async () => {
  const at = holdingBuildScript()

  const held = await installedBy(at, PLAN, HOST, stamped)

  expect(held.code).toBe(OPERATIONAL)
  expect(held.refusals[0]).toContain("BUILD_SIM_OK")
  const last = held.refusals[held.refusals.length - 1] as string
  expect(last).toContain(stagedFrom(at))
  expect(last).toContain(TREE)
  expect(last).toContain(SCRIPT)
})

test("what the report already says is not said a second time by naming it", async () => {
  const at = holdingBuildScript()

  const held = await installedBy(at, PLAN, HOST, stamped)

  expect(staging(held.report)).toHaveLength(1)
  expect(held.report.filter((one) => one === stagedFrom(at))).toEqual([])
})
