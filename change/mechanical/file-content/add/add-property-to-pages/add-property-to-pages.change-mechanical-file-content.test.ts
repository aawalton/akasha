import { expect, test } from "bun:test"
import {
  addPropertyToPages,
  runChange,
} from "akasha/change/mechanical/file-content/add/add-property-to-pages/add-property-to-pages.change-mechanical-file-content.code.ts"
import {
  bodyAnswered,
  refusalOf,
  worldOf,
} from "akasha/change/test-fixtures/shadow-world/shadow-world.test-fixture.code.ts"

const ONE = "held/one.domain.ts"

const TWO = "held/two.domain.ts"

const KEY = "spellings"

const NOUN = `[{ partOfSpeech: "part-of-speech/noun", spelling: "one" }]`

const OTHER = `[{ partOfSpeech: "part-of-speech/noun", spelling: "two" }]`

const STATED = `export const one = {
  spellings: [],
} as const
`

type Valued = {
  readonly path: string
  readonly value: string
}

function bodied(slug: string): string {
  return `export const ${slug} = {
  slug: "${slug}",
  definition: "one thing",
} as const satisfies Domain
`
}

function answering(valued: readonly Valued[], after?: string) {
  const world = worldOf({ [ONE]: bodied("one"), [TWO]: bodied("two") })
  const given = after === undefined ? { key: KEY, valued } : { key: KEY, valued, after }
  return { world, said: addPropertyToPages(world, given) }
}

test("each page named takes a value of its own", () => {
  const { world, said } = answering([
    { path: ONE, value: NOUN },
    { path: TWO, value: OTHER },
  ])
  expect(bodyAnswered(said, world, ONE)).toContain(NOUN)
  expect(bodyAnswered(said, world, TWO)).toContain(OTHER)
})

test("a value is put in as the caller spells it rather than as text to quote", () => {
  const { world, said } = answering([{ path: ONE, value: NOUN }])
  expect(bodyAnswered(said, world, ONE)).not.toContain(JSON.stringify(NOUN))
})

test("an `after` the caller states places the key on every page named", () => {
  const { world, said } = answering([{ path: ONE, value: NOUN }], "slug")
  expect(bodyAnswered(said, world, ONE)).toContain(`  slug: "one",\n  ${KEY}: ${NOUN},`)
})

test("a page stating the key already is refused rather than gaining a second value", () => {
  const world = worldOf({ [ONE]: STATED })
  const said = addPropertyToPages(world, { key: KEY, valued: [{ path: ONE, value: NOUN }] })
  expect(refusalOf(said)).toContain("is stated already")
})

test("a refusal over a page names that page", () => {
  const world = worldOf({ [ONE]: STATED })
  const said = addPropertyToPages(world, { key: KEY, valued: [{ path: ONE, value: NOUN }] })
  expect(refusalOf(said)).toContain(ONE)
})

test("a page named twice is refused, because one page takes one value", () => {
  const { said } = answering([
    { path: ONE, value: NOUN },
    { path: ONE, value: OTHER },
  ])
  expect(refusalOf(said)).toContain("is named twice")
})

test("a value that parses as no value is refused", () => {
  const { said } = answering([{ path: ONE, value: "held()" }])
  expect(refusalOf(said)).toContain("parses as no value")
})

test("naming no page is refused rather than answered as no edit", () => {
  const said = addPropertyToPages(worldOf({}), { key: KEY, valued: [] })
  expect(refusalOf(said)).toContain("no page is named")
})

test("a key spelled as a slug is refused", () => {
  const said = addPropertyToPages(worldOf({}), {
    key: "part-slugs",
    valued: [{ path: ONE, value: NOUN }],
  })
  expect(refusalOf(said)).toContain("is no key a page spells")
})

test("the change is reached through its own runner", () => {
  const world = worldOf({ [ONE]: bodied("one") })
  const said = runChange(world, { key: KEY, valued: [{ path: ONE, value: NOUN }] })
  expect(bodyAnswered(said, world, ONE)).toContain(NOUN)
})
