import { expect, test } from "bun:test"
import {
  addPageInstants,
  runChange,
} from "akasha/change/agent/page-type/add-page-instants/add-page-instants.change-agent.code.ts"
import { addPageInstants as mechanical } from "akasha/change/mechanical/page-type/add/add-page-instants/add-page-instants.change-mechanical-page-type.ts"
import { changeMechanicalPageType } from "akasha/change/mechanical/page-type/change-mechanical-page-type.page-type.ts"
import { ledgerAt } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import {
  type Caught,
  catching,
  filesOf,
} from "akasha/change/test-fixtures/shadow-world/shadow-world.test-fixture.code.ts"

const STAMPING = `${changeMechanicalPageType.slug}/${mechanical.slug}`

const NOWHERE = "/nowhere"

test("stating the instants is left to the change reached at its address", async () => {
  const seen: Caught[] = []

  await addPageInstants(ledgerAt(NOWHERE, filesOf({}), catching(seen)), {
    pageType: "page",
    atMost: null,
  })

  expect(seen).toEqual([{ at: STAMPING, given: { pageType: "page", atMost: null } }])
})

test("the run hands on the page type and the count", async () => {
  const seen: Caught[] = []

  await runChange(ledgerAt(NOWHERE, filesOf({}), catching(seen)), {
    "page-type": "page",
    "at-most": "500",
  })

  expect(seen).toEqual([{ at: STAMPING, given: { pageType: "page", atMost: 500 } }])
})

test("a run handed no page type is refused by the key", async () => {
  const said = await runChange(ledgerAt(NOWHERE, filesOf({}), catching([])), {})

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/`page-type` names what this change is handed/)
})
