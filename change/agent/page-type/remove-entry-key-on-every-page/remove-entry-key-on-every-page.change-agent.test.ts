import { expect, test } from "bun:test"
import {
  removeEntryKeyOnEveryPage,
  runChange,
} from "akasha/change/agent/page-type/remove-entry-key-on-every-page/remove-entry-key-on-every-page.change-agent.code.ts"
import { changeMechanicalPageType } from "akasha/change/mechanical/page-type/change-mechanical-page-type.page-type.ts"
import { removeEntryKeyOnEveryPage as mechanical } from "akasha/change/mechanical/page-type/remove/remove-entry-key-on-every-page/remove-entry-key-on-every-page.change-mechanical-page-type.ts"
import { ledgerAt } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import {
  type Caught,
  catching,
  filesOf,
} from "akasha/change/test-fixtures/shadow-world/shadow-world.test-fixture.code.ts"

const TAKING = `${changeMechanicalPageType.slug}/${mechanical.slug}`

const ASKED = { pageType: "week", key: "spans", field: "opened", kept: "openedAt" }

test("taking the key out is left to the change reached at its address", async () => {
  const seen: Caught[] = []

  await removeEntryKeyOnEveryPage(ledgerAt("/nowhere", filesOf({}), catching(seen)), ASKED)

  expect(seen).toEqual([{ at: TAKING, given: ASKED }])
})

test("a run naming no key to keep hands on none", async () => {
  const seen: Caught[] = []

  await runChange(ledgerAt("/nowhere", filesOf({}), catching(seen)), {
    "page-type": "week",
    key: "spans",
    field: "opened",
  })

  expect(seen).toEqual([{ at: TAKING, given: { ...ASKED, kept: null, atMost: null } }])
})

test("a run handed no key to take out is refused by the key", async () => {
  const said = await runChange(ledgerAt("/nowhere", filesOf({}), catching([])), {
    "page-type": "week",
    key: "spans",
  })

  expect(said.refused ?? "").toMatch(/`field` names what this change is handed/)
})
