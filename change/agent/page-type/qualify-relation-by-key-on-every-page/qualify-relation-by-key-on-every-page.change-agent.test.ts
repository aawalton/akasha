import { expect, test } from "bun:test"
import {
  qualifyRelationByKeyOnEveryPage,
  runChange,
} from "akasha/change/agent/page-type/qualify-relation-by-key-on-every-page/qualify-relation-by-key-on-every-page.change-agent.code.ts"
import { qualifyRelationByKeyOnEveryPage as mechanical } from "akasha/change/mechanical/page-type/change/qualify-relation-by-key-on-every-page/qualify-relation-by-key-on-every-page.change-mechanical-page-type.ts"
import { changeMechanicalPageType } from "akasha/change/mechanical/page-type/change-mechanical-page-type.page-type.ts"
import { ledgerAt, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { filesOf } from "akasha/change/test-fixtures/shadow-world/shadow-world.test-fixture.code.ts"

const QUALIFYING = `${changeMechanicalPageType.slug}/${mechanical.slug}`

const ASKED = {
  pageType: "book-section",
  key: "conditions",
  field: "collection",
  target: "collection",
  by: "name",
}

function worldReaching(reached: unknown[]): World {
  return ledgerAt("/nowhere", filesOf({}), (_world, at, given) => {
    reached.push([at, given])
    return Promise.resolve({ edits: [], refused: null })
  })
}

test("writing the names anew is left to the change reached at its address", async () => {
  const reached: unknown[] = []

  await qualifyRelationByKeyOnEveryPage(worldReaching(reached), ASKED)

  expect(reached).toEqual([[QUALIFYING, ASKED]])
})

test("the run hands on the field, the target and the key its pages state names under", async () => {
  const reached: unknown[] = []

  await runChange(worldReaching(reached), {
    "page-type": "book-section",
    key: "conditions",
    field: "collection",
    target: "collection",
    by: "name",
  })

  expect(reached).toEqual([[QUALIFYING, { ...ASKED, atMost: null }]])
})

test("a run handed no target is refused by the key", async () => {
  const said = await runChange(worldReaching([]), {
    "page-type": "book-section",
    key: "conditions",
    field: "collection",
    by: "name",
  })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/`target` names what this change is handed/)
})
