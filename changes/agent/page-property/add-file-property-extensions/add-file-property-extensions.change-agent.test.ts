import { expect, test } from "bun:test"
import {
  addFilePropertyExtensions,
  runChange,
} from "akasha/changes/agent/page-property/add-file-property-extensions/add-file-property-extensions.change-agent.code.ts"
import { ledgerAt } from "akasha/changes/modules/shadow/change-shadow.module.code.ts"
import {
  type Caught,
  catching,
} from "akasha/changes/modules/shadow/change-shadow.module.test-fixtures.ts"
import { listing } from "akasha/changes/runners/pages/test-change-running/test-change-running.change-runner.code.ts"

const RUNG = "change-mechanical-page-type/add-file-property-extensions"

const NOWHERE = "/nowhere"

test("the one change reached is the mechanical change acting on a page type", async () => {
  const seen: string[] = []

  const said = await addFilePropertyExtensions(
    ledgerAt(NOWHERE, () => null, listing(seen)),
    {}
  )

  expect(said.refused).toBeNull()
  expect(seen).toEqual([RUNG])
})

test("the folder named is handed on to the change reached", async () => {
  const seen: Caught[] = []

  await runChange(
    ledgerAt(NOWHERE, () => null, catching(seen)),
    { under: "held/" }
  )

  expect(seen).toEqual([{ at: RUNG, given: { under: "held/" } }])
})

test("a run naming no folder hands no folder on", async () => {
  const seen: Caught[] = []

  await runChange(
    ledgerAt(NOWHERE, () => null, catching(seen)),
    {}
  )

  expect(seen).toEqual([{ at: RUNG, given: {} }])
})
