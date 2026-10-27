import { expect, test } from "bun:test"
import {
  runChange,
  unlistPagesUnder,
} from "akasha/change/agent/folder/unlist-pages-under/unlist-pages-under.change-agent.code.ts"
import { changeMechanicalFolder } from "akasha/change/mechanical/folder/change-mechanical-folder.page-type.ts"
import { unlistPagesUnder as unlistPagesUnderMechanical } from "akasha/change/mechanical/folder/unlist-pages-under/unlist-pages-under.change-mechanical-folder.ts"
import { refusing } from "akasha/change/modules/answer/change-answer.module.code.ts"
import { NOTHING_OVER } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import {
  type Carried,
  worldRecording,
} from "akasha/change/test-fixtures/shadow-world/shadow-world.test-fixture.code.ts"

const AT = "akasha/some-folder"

const UNLIST = `${changeMechanicalFolder.slug}/${unlistPagesUnderMechanical.slug}` as const

const REFUSED = "`akasha/some-folder` holds no page, so no name is taken out"

test("the whole run is left to the change reached at its address", async () => {
  const carried: Carried = { at: "", given: null }

  const said = await unlistPagesUnder(worldRecording(carried, NOTHING_OVER), { at: AT })

  expect(said.refused).toBe(null)
  expect(carried.at).toBe(UNLIST)
  expect(carried.given).toEqual({ at: AT })
})

test("a refusal from the change reached is this change's answer", async () => {
  const said = await unlistPagesUnder(worldRecording({ at: "", given: null }, refusing(REFUSED)), {
    at: AT,
  })

  expect(said.refused).toBe(REFUSED)
  expect(said.edits).toEqual([])
})

test("an argument the change was handed no value for is refused by its key", async () => {
  const said = await runChange(worldRecording({ at: "", given: null }, NOTHING_OVER), {})

  expect(said.refused ?? "").toContain("`at`")
})
