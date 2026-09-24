import { expect, test } from "bun:test"
import {
  type Asked,
  removeEntryKeyOnEveryPage,
} from "akasha/change/mechanical/page-type/remove/remove-entry-key-on-every-page/remove-entry-key-on-every-page.change-mechanical-page-type.code.ts"
import { pathsIn } from "akasha/change/modules/answer/change-answer.module.code.ts"
import {
  ONE_ROWS_AT,
  TWO_ROWS_AT,
  TYPE,
  weeksWith,
} from "akasha/change/modules/entry-rewriting/entry-rewriting.module.test-fixtures.ts"
import { bodiesIn } from "akasha/change/modules/shadow/change-shadow.module.code.ts"

const ASKED: Asked = { pageType: TYPE, key: "spans", field: "opened" }

const KEPT: Asked = { ...ASKED, kept: "openedAt" }

test("the key named goes from every entry stating it, with the comma it leaves", () => {
  const world = weeksWith({
    [ONE_ROWS_AT]: '{"id":"a","opened":"x","note":"n"}\n{"id":"b","opened":"y"}\n{"id":"c"}\n',
  })

  const said = removeEntryKeyOnEveryPage(world, ASKED)

  expect(said.refused).toBeNull()
  expect(bodiesIn(said, world.base).get(ONE_ROWS_AT) ?? "").toBe(
    '{"id":"a","note":"n"}\n{"id":"b"}\n{"id":"c"}\n'
  )
})

test("a key named to keep the value lets the key go where it holds that value", () => {
  const world = weeksWith({ [ONE_ROWS_AT]: '{"opened":"x","openedAt":"x"}\n' })

  const said = removeEntryKeyOnEveryPage(world, KEPT)

  expect(bodiesIn(said, world.base).get(ONE_ROWS_AT) ?? "").toBe('{"openedAt":"x"}\n')
})

test("an entry whose value the key kept does not hold refuses the whole change", () => {
  const world = weeksWith({
    [ONE_ROWS_AT]: '{"opened":"x","openedAt":"x"}\n',
    [TWO_ROWS_AT]: '{"opened":"y"}\n',
  })

  const said = removeEntryKeyOnEveryPage(world, KEPT)

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain(TWO_ROWS_AT)
})

test("a count handed in holds how many pages one run writes", () => {
  const world = weeksWith({
    [ONE_ROWS_AT]: '{"opened":"x"}\n',
    [TWO_ROWS_AT]: '{"opened":"y"}\n',
  })

  const said = removeEntryKeyOnEveryPage(world, { ...ASKED, atMost: 1 })

  expect([...new Set(pathsIn(said))]).toEqual([ONE_ROWS_AT])
})

test("a page type no entry of which states the key is answered as no edit", () => {
  const said = removeEntryKeyOnEveryPage(weeksWith({ [ONE_ROWS_AT]: '{"id":"a"}\n' }), ASKED)

  expect(said.edits).toEqual([])
  expect(said.told).toEqual(["no entry under `spans` states `opened`"])
})
