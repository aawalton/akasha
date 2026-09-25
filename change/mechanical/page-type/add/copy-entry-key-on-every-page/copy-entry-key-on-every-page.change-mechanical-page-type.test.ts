import { expect, test } from "bun:test"
import {
  type Asked,
  copyEntryKeyOnEveryPage,
} from "akasha/change/mechanical/page-type/add/copy-entry-key-on-every-page/copy-entry-key-on-every-page.change-mechanical-page-type.code.ts"
import { pathsIn } from "akasha/change/modules/answer/change-answer.module.code.ts"
import {
  ENTRY_KIND,
  ONE_ROWS_AT,
  PART_TWO_AT,
  TWO_ROWS_AT,
  TYPE,
  weeksWith as worldFor,
} from "akasha/change/modules/entry-rewriting/entry-rewriting.module.test-fixtures.ts"
import { bodiesIn } from "akasha/change/modules/shadow/change-shadow.module.code.ts"

const ASKED: Asked = { pageType: TYPE, key: "spans", from: "opened", to: "openedAt" }

test("the key written to is put in straight after the key read from, which stays", () => {
  const world = worldFor({ [ONE_ROWS_AT]: '{"id":"a","opened":"x","note":"n"}\n{"id":"b"}\n' })

  const said = copyEntryKeyOnEveryPage(world, ASKED)

  expect(said.refused).toBeNull()
  expect(bodiesIn(said, world.base).get(ONE_ROWS_AT) ?? "").toBe(
    '{"id":"a","opened":"x","openedAt":"x","note":"n"}\n{"id":"b"}\n'
  )
})

test("a key read from that closes its entry is copied before the entry closes", () => {
  const world = worldFor({ [ONE_ROWS_AT]: '{"id":"a","opened":"x"}\n' })

  const said = copyEntryKeyOnEveryPage(world, ASKED)

  expect(bodiesIn(said, world.base).get(ONE_ROWS_AT) ?? "").toBe(
    '{"id":"a","opened":"x","openedAt":"x"}\n'
  )
})

test("every part of the file beside the page is written", () => {
  const world = worldFor({
    [ONE_ROWS_AT]: '{"opened":"x"}\n',
    [PART_TWO_AT]: '{"opened":"y"}\n',
  })

  const said = copyEntryKeyOnEveryPage(world, ASKED)

  const bodies = bodiesIn(said, world.base)
  expect(bodies.get(ONE_ROWS_AT) ?? "").toContain('"openedAt":"x"')
  expect(bodies.get(PART_TWO_AT) ?? "").toContain('"openedAt":"y"')
})

test("an entry already stating the same value under both keys is passed over", () => {
  const world = worldFor({
    [ONE_ROWS_AT]: '{"opened":"x","openedAt":"x"}\n',
    [TWO_ROWS_AT]: '{"opened":"y"}\n',
  })

  const said = copyEntryKeyOnEveryPage(world, ASKED)

  expect(said.refused).toBeNull()
  expect([...new Set(pathsIn(said))]).toEqual([TWO_ROWS_AT])
})

test("an entry stating two values under the two keys refuses the whole change", () => {
  const world = worldFor({
    [ONE_ROWS_AT]: '{"opened":"y"}\n',
    [TWO_ROWS_AT]: '{"opened":"x","openedAt":"z"}\n',
  })

  const said = copyEntryKeyOnEveryPage(world, ASKED)

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain(TWO_ROWS_AT)
})

test("a count handed in holds how many pages one run writes", () => {
  const world = worldFor({
    [ONE_ROWS_AT]: '{"opened":"x"}\n',
    [TWO_ROWS_AT]: '{"opened":"y"}\n',
  })

  const said = copyEntryKeyOnEveryPage(world, { ...ASKED, atMost: 1 })

  expect([...new Set(pathsIn(said))]).toEqual([ONE_ROWS_AT])
})

test("a page already written is not counted, so the next run reaches the next page", () => {
  const world = worldFor({
    [ONE_ROWS_AT]: '{"opened":"x","openedAt":"x"}\n',
    [TWO_ROWS_AT]: '{"opened":"y"}\n',
  })

  const said = copyEntryKeyOnEveryPage(world, { ...ASKED, atMost: 1 })

  expect([...new Set(pathsIn(said))]).toEqual([TWO_ROWS_AT])
})

test("a page type no entry of which needs the key written is answered as no edit", () => {
  const world = worldFor({ [ONE_ROWS_AT]: '{"id":"a"}\n' })

  const said = copyEntryKeyOnEveryPage(world, ASKED)

  expect(said.edits).toEqual([])
  expect(said.refused).toBeNull()
  expect(said.told).toEqual(["no entry under `spans` states `opened` without `openedAt`"])
})

test("a key keeping no entries beside the page is refused", () => {
  const said = copyEntryKeyOnEveryPage(worldFor({}), { ...ASKED, key: "heldBy" })

  expect(said.refused).toBe("a `week` has no property under `heldBy`")
})

test("a key whose property is a kind of entry property is written too", () => {
  const world = worldFor({ [ONE_ROWS_AT]: '{"opened":"x"}\n' }, ENTRY_KIND)

  const said = copyEntryKeyOnEveryPage(world, ASKED)

  expect(said.refused).toBeNull()
  expect(bodiesIn(said, world.base).get(ONE_ROWS_AT) ?? "").toBe('{"opened":"x","openedAt":"x"}\n')
})

test("a key whose property keeps a file rather than entries is refused", () => {
  const said = copyEntryKeyOnEveryPage(worldFor({}, "file-property"), ASKED)

  expect(said.refused).toBe("`spans` on a `week` keeps no entries beside the page")
})

test("a page type the index does not name is refused", () => {
  const said = copyEntryKeyOnEveryPage(worldFor({}), { ...ASKED, pageType: "month" })

  expect(said.refused).toBe("`month` names no page type")
})
