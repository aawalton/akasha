import { afterAll, expect, test } from "bun:test"
import { join } from "node:path"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { DATA } from "akasha/commands/modules/cli/cli.module.code.ts"
import { scratchWorld } from "akasha/commands/modules/scratching/scratching.module.code.ts"
import { installedOnSimulator } from "akasha/commands/pages/deploy/simulator-installing/deploy-simulator-installing.module.code.ts"
import { listedFiled } from "akasha/pages/indexes/filing/index-filing.module.code.ts"
import { put } from "akasha/testing-system/putting/putting.module.code.ts"

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

test("an app no page is slugged for refuses at the data rather than the caller", () => {
  const answer = installedOnSimulator("nosuchapp", given(root))

  expect(answer.code).toBe(DATA)
  expect(answer.refusals.join(" ")).toContain("nosuchapp")
})

test("an app naming no build script refuses before reaching a machine", () => {
  const answer = installedOnSimulator("quiet", given(namingNoBuildScript()))

  expect(answer.code).toBe(DATA)
  expect(answer.refusals.join(" ")).toContain("build-script")
  expect(answer.report).toEqual([])
})
