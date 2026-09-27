import { expect, test } from "bun:test"
import {
  runChange,
  unquotedOf,
  unquoteTextOnEveryPage,
} from "akasha/change/mechanical/page-type/change/unquote-text-on-every-page/unquote-text-on-every-page.change-mechanical-page-type.code.ts"
import {
  BODIES,
  KEY,
  NOTHING_QUOTED,
  ONE_AT,
  PLAIN,
  sectionAt,
  TWO_AT,
  TYPE,
  VALUES,
  valued,
  worldFor,
} from "akasha/change/mechanical/page-type/change/unquote-text-on-every-page/unquote-text-on-every-page.change-mechanical-page-type.test-fixtures.ts"
import { pathsIn, refusing } from "akasha/change/modules/answer/change-answer.module.code.ts"
import { bodiesIn, type Reaching } from "akasha/change/modules/shadow/change-shadow.module.code.ts"

const REACHED: string[] = []

const reaches: Reaching = (_world, at) => {
  REACHED.push(at)
  return Promise.resolve(refusing(`\`${at}\` is reached by nothing here`))
}

test("text held inside quote marks is read as the text the quotes spell", () => {
  expect(unquotedOf('"Deal damage.\\nSay \\"now\\"."')).toBe('Deal damage.\nSay "now".')
})

test("text not wrapped in quote marks, or not spelling one text, is passed over", () => {
  expect(unquotedOf("Deal damage.")).toBeNull()
  expect(unquotedOf('"open')).toBeNull()
  expect(unquotedOf('"a" and "b"')).toBeNull()
  expect(unquotedOf(7)).toBeNull()
})

test("only the page holding quoted text is written, with the text the quotes spell", () => {
  const world = worldFor(BODIES, VALUES, reaches)

  const said = runChange(world, { pageType: TYPE, key: KEY })

  expect(said.refused).toBeNull()
  expect(pathsIn(said)).toEqual([ONE_AT])
  expect(bodiesIn(said, world.base).get(ONE_AT) ?? "").toContain(
    `${KEY}: ${JSON.stringify('Deal damage.\nSay "now".')},`
  )
})

test("a page type no page of which holds quoted text is answered as no edit", () => {
  const held = { [TWO_AT]: sectionAt("two", PLAIN) }
  const world = worldFor(held, valued({ [TWO_AT]: PLAIN }), reaches)

  const said = unquoteTextOnEveryPage(world, { pageType: TYPE, key: KEY })

  expect(said.edits).toEqual([])
  expect(said.refused).toBeNull()
  expect(said.told).toEqual([NOTHING_QUOTED])
})

test("a page type the index does not name is refused", () => {
  const world = worldFor(BODIES, VALUES, reaches, null)

  const said = unquoteTextOnEveryPage(world, { pageType: TYPE, key: KEY })

  expect(said.refused).toBe("`book-section` names no page type")
})

test("a page whose body states no text under the key is refused by its path", () => {
  const world = worldFor({ ...BODIES, [ONE_AT]: "const one = 1\n" }, VALUES, reaches)

  const said = unquoteTextOnEveryPage(world, { pageType: TYPE, key: KEY })

  expect(said.refused).toBe("`alan/book/one.book-section.ts` states no text under `description`")
})

test("a count handed in bounds how many pages one answer writes", () => {
  const both = valued({ [ONE_AT]: '"a"', [TWO_AT]: '"b"' })
  const bodies = { [ONE_AT]: sectionAt("one", '"a"'), [TWO_AT]: sectionAt("two", '"b"') }
  const world = worldFor(bodies, both, reaches)

  const said = unquoteTextOnEveryPage(world, { pageType: TYPE, key: KEY, atMost: 1 })

  expect(pathsIn(said)).toHaveLength(1)
})

test("no rung beneath is reached", () => {
  REACHED.length = 0
  const world = worldFor(BODIES, VALUES, reaches)

  unquoteTextOnEveryPage(world, { pageType: TYPE, key: KEY })

  expect(REACHED).toEqual([])
})
