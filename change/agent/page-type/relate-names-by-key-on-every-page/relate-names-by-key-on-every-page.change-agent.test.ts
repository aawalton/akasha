import { expect, test } from "bun:test"
import {
  relateNamesByKeyOnEveryPage,
  runChange,
} from "akasha/change/agent/page-type/relate-names-by-key-on-every-page/relate-names-by-key-on-every-page.change-agent.code.ts"
import { relateNamesByKeyOnEveryPage as mechanical } from "akasha/change/mechanical/page-type/change/relate-names-by-key-on-every-page/relate-names-by-key-on-every-page.change-mechanical-page-type.ts"
import { changeMechanicalPageType } from "akasha/change/mechanical/page-type/change-mechanical-page-type.page-type.ts"
import { ledgerAt, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { filesOf } from "akasha/change/test-fixtures/shadow-world/shadow-world.test-fixture.code.ts"

const RELATING = `${changeMechanicalPageType.slug}/${mechanical.slug}`

const ASKED = {
  pageType: "show",
  key: "streamingOn",
  target: "streaming-service",
  by: "providerNames",
}

type Reached = { readonly at: string; readonly given: unknown }

function relating(reached: Reached[]): World {
  const answered = { edits: [], refused: null }
  return ledgerAt("/nowhere", filesOf({}), async (_world, at, given) => {
    reached.push({ at, given })
    return await Promise.resolve(answered)
  })
}

test("writing the names anew is left to the change reached at its address", async () => {
  const reached: Reached[] = []

  await relateNamesByKeyOnEveryPage(relating(reached), ASKED)

  expect(reached).toEqual([{ at: RELATING, given: ASKED }])
})

test("the run hands on the target and the key its pages list names under", async () => {
  const reached: Reached[] = []

  await runChange(relating(reached), {
    "page-type": "show",
    key: "streamingOn",
    target: "streaming-service",
    by: "providerNames",
  })

  expect(reached).toEqual([{ at: RELATING, given: { ...ASKED, atMost: null } }])
})

test("a run handed no target is refused by the key", async () => {
  const said = await runChange(relating([]), {
    "page-type": "show",
    key: "streamingOn",
    by: "providerNames",
  })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/`target` names what this change is handed/)
})

test("a run handed no by is refused by the key", async () => {
  const said = await runChange(relating([]), {
    "page-type": "show",
    key: "streamingOn",
    target: "streaming-service",
  })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/`by` names what this change is handed/)
})
