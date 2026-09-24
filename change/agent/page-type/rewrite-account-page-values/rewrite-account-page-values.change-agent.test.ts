import { expect, test } from "bun:test"
import { runChange } from "akasha/change/agent/page-type/rewrite-account-page-values/rewrite-account-page-values.change-agent.code.ts"
import {
  BODIES,
  besideWorld,
  ONE_AT,
  ROWS_AT,
  rowsOf,
  TWO_AT,
  VALUES,
  worldFor,
} from "akasha/change/mechanical/page-type/change/qualify-relation-on-every-page/qualify-relation-on-every-page.change-mechanical-page-type.test-fixtures.ts"
import { pathsIn } from "akasha/change/modules/answer/change-answer.module.code.ts"
import { bodiesIn } from "akasha/change/modules/shadow/change-shadow.module.code.ts"

test("the value is written anew in the page's body", () => {
  const world = worldFor(BODIES, VALUES)

  const said = runChange(world, {
    "page-type": "book-section",
    key: "sectionOf",
    from: "scriptures",
    to: "collection/scriptures",
  })

  expect(said.refused).toBeNull()
  expect(bodiesIn(said, world.base).get(ONE_AT) ?? "").toContain(
    `sectionOf: "collection/scriptures"`
  )
  expect(pathsIn(said)).not.toContain(TWO_AT)
})

test("the value is written anew in every entry file beside the page", () => {
  const world = besideWorld({
    [ROWS_AT]: rowsOf([{ collection: "scriptures" }, { collection: "songs" }]),
  })

  const said = runChange(world, {
    "page-type": "book-section",
    key: "collection",
    from: "scriptures",
    to: "collection/scriptures",
  })

  expect(said.refused).toBeNull()
  expect(bodiesIn(said, world.base).get(ROWS_AT) ?? "").toBe(
    '{"collection":"collection/scriptures"}\n{"collection":"songs"}\n'
  )
})

test("a page type no page of which holds the value is refused", () => {
  const said = runChange(worldFor(BODIES, VALUES), {
    "page-type": "book-section",
    key: "sectionOf",
    from: "psalms",
    to: "collection/psalms",
  })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe("no `book-section` holds `psalms` under `sectionOf`")
})

test("an argument this change was handed no value for is refused by the key", () => {
  const said = runChange(worldFor(BODIES, VALUES), {
    "page-type": "book-section",
    key: "sectionOf",
  })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/`from` names what this change is handed/)
})
