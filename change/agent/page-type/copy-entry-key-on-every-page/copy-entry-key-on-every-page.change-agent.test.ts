import { expect, test } from "bun:test"
import {
  copyEntryKeyOnEveryPage,
  runChange,
} from "akasha/change/agent/page-type/copy-entry-key-on-every-page/copy-entry-key-on-every-page.change-agent.code.ts"
import { copyEntryKeyOnEveryPage as mechanical } from "akasha/change/mechanical/page-type/add/copy-entry-key-on-every-page/copy-entry-key-on-every-page.change-mechanical-page-type.ts"
import { changeMechanicalPageType } from "akasha/change/mechanical/page-type/change-mechanical-page-type.page-type.ts"
import { ledgerAt, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import {
  type Caught,
  catching,
  filesOf,
} from "akasha/change/test-fixtures/shadow-world/shadow-world.test-fixture.code.ts"

const COPYING = `${changeMechanicalPageType.slug}/${mechanical.slug}`

const ASKED = { pageType: "week", key: "spans", from: "opened", to: "openedAt" }

function caughtIn(seen: Caught[]): World {
  return ledgerAt("/nowhere", filesOf({}), catching(seen))
}

test("writing the key is left to the change reached at its address", async () => {
  const seen: Caught[] = []

  await copyEntryKeyOnEveryPage(caughtIn(seen), ASKED)

  expect(seen).toEqual([{ at: COPYING, given: ASKED }])
})

test("the run hands on the page type, the key and the two keys inside each entry", async () => {
  const seen: Caught[] = []

  await runChange(caughtIn(seen), {
    "page-type": "week",
    key: "spans",
    from: "opened",
    to: "openedAt",
    "at-most": "3",
  })

  expect(seen).toEqual([{ at: COPYING, given: { ...ASKED, atMost: 3 } }])
})

test("a run handed no key to write to is refused by the key", async () => {
  const said = await runChange(caughtIn([]), {
    "page-type": "week",
    key: "spans",
    from: "opened",
  })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/`to` names what this change is handed/)
})
