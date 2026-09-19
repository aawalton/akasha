import { expect, test } from "bun:test"
import {
  removePropertyFromEveryPage,
  runChange,
} from "akasha/change/mechanical/page-type/remove/remove-property-from-every-page/remove-property-from-every-page.change-mechanical-page-type.code.ts"
import { pathsIn } from "akasha/change/modules/answer/change-answer.module.code.ts"
import {
  bodiesIn,
  type Reaching,
  type World,
} from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { worldOfType } from "akasha/change/test-fixtures/shadow-world/shadow-world.test-fixture.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import type { Carried } from "akasha/page/type/modules/declared-properties/declared-properties.module.code.ts"

const ONE_AT = "thrumming/moots/one.moot-call.ts"

const TWO_AT = "thrumming/moots/two.moot-call.ts"

const TYPE = "moot-call"

const KEY = "heldBy"

const REACHED: string[] = []

const reaches: Reaching = (_world, at) => {
  REACHED.push(at)
  return Promise.resolve({ edits: [], refused: null })
}

function mootAt(slug: string): string {
  return `export const ${slug} = {
  slug: "${slug}",
  ${KEY}: "aine",
  weight: 1,
} as const satisfies MootCall
`
}

type Files = Readonly<Record<string, string>>

const BODIES: Files = { [ONE_AT]: mootAt("one"), [TWO_AT]: mootAt("two") }

const DECLARED: Carried = {
  pagePropertySlug: "held-by",
  pageTypeSlug: "relation-property",
  propertySlug: "held-by",
  key: KEY,
  unique: null,
  declaredBy: TYPE,
  required: false,
  many: false,
  maxCount: null,
  maxLength: null,
  uncommitted: false,
  secret: false,
}

const HOLDS: Value = { slug: "held", [KEY]: "aine", weight: 1 }

function worldFor(
  bodies: Files,
  carried: readonly Carried[] | null,
  listed: readonly string[]
): World {
  const values = new Map(listed.map((path) => [path, HOLDS]))
  return worldOfType(TYPE, bodies, carried, values, reaches)
}

const EVERY = [ONE_AT, TWO_AT]

const TAKING = { pageType: TYPE, key: KEY }

test("every page holding the key is answered in this one answer", () => {
  const world = worldFor(BODIES, [DECLARED], EVERY)

  const said = removePropertyFromEveryPage(world, TAKING)

  expect(said.refused).toBeNull()
  expect(said.edits).toHaveLength(2)
  const bodies = bodiesIn(said, world.base)
  expect(bodies.get(ONE_AT) ?? "").not.toContain(KEY)
  expect(bodies.get(ONE_AT) ?? "").toContain(`slug: "one",\n  weight: 1,`)
  expect(bodies.get(TWO_AT) ?? "").not.toContain(KEY)
})

test("a page whose body states no such key is answered as no edit", () => {
  const bare = mootAt("two").replace(`  ${KEY}: "aine",\n`, "")
  const world = worldFor({ ...BODIES, [TWO_AT]: bare }, [DECLARED], EVERY)

  const said = removePropertyFromEveryPage(world, TAKING)

  expect(said.refused).toBeNull()
  expect(pathsIn(said)).toEqual([ONE_AT])
})

test("a key the page type no longer declares goes from every page holding it", () => {
  const said = removePropertyFromEveryPage(worldFor(BODIES, [], EVERY), TAKING)

  expect(said.refused).toBeNull()
  expect(pathsIn(said)).toEqual(EVERY)
})

test("a key a page type here requires is refused for that page type", () => {
  const required = [{ ...DECLARED, required: true }]

  const said = removePropertyFromEveryPage(worldFor(BODIES, required, EVERY), TAKING)

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(`a \`${TYPE}\` requires \`${KEY}\`, so taking it away is a retype`)
})

test("a page type the index does not name is refused", () => {
  const said = removePropertyFromEveryPage(worldFor(BODIES, null, EVERY), TAKING)

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(`\`${TYPE}\` names no page type`)
})

test("a page type no page of which holds the key is refused rather than answered as no edit", () => {
  const said = removePropertyFromEveryPage(worldFor(BODIES, [DECLARED], []), TAKING)

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(`no \`${TYPE}\` carries \`${KEY}\``)
})

test("a count handed in bounds how many pages the key goes from", () => {
  const world = worldFor(BODIES, [DECLARED], EVERY)

  const said = removePropertyFromEveryPage(world, { ...TAKING, atMost: 1 })

  expect(said.refused).toBeNull()
  expect(pathsIn(said)).toEqual([ONE_AT])
})

test("a page exporting no object is refused by its path", () => {
  const held = { ...BODIES, [TWO_AT]: "const two = 1\n" }

  const said = runChange(worldFor(held, [DECLARED], EVERY), TAKING)

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(`\`${TWO_AT}\` exports no object`)
})

test("no rung beneath is reached", () => {
  REACHED.length = 0

  const said = removePropertyFromEveryPage(worldFor(BODIES, [DECLARED], EVERY), TAKING)

  expect(said.refused).toBeNull()
  expect(REACHED).toEqual([])
})
