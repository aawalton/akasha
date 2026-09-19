import { expect, test } from "bun:test"
import {
  addFilePropertyExtensions,
  runChange,
} from "akasha/change/agent/page-type/add-file-property-extensions/add-file-property-extensions.change-agent.code.ts"
import { addFilePropertyExtensions as addFilePropertyExtensionsMechanical } from "akasha/change/mechanical/page-type/add/add-file-property-extensions/add-file-property-extensions.change-mechanical-page-type.ts"
import { changeMechanicalPageType } from "akasha/change/mechanical/page-type/change-mechanical-page-type.page-type.ts"
import { ledgerAt } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { listing } from "akasha/change/runner/pages/test-change-running/test-change-running.change-runner.code.ts"
import {
  type Caught,
  catching,
} from "akasha/change/test-fixtures/shadow-world/shadow-world.test-fixture.code.ts"

const RUNG = `${changeMechanicalPageType.slug}/${addFilePropertyExtensionsMechanical.slug}` as const

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
