import { afterAll, expect, test } from "bun:test"
import type { Answer } from "akasha/change/modules/answer/change-answer.module.code.ts"
import {
  bodiesIn,
  type World,
  worldAt,
} from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { slugRenamed } from "akasha/change/modules/slug-renaming/slug-renaming.module.code.ts"
import {
  listing,
  running,
} from "akasha/change/runner/pages/test-change-running/test-change-running.change-runner.code.ts"
import {
  bodyAfter,
  bodyAt,
} from "akasha/change/test-fixtures/shadow-world/shadow-world.test-fixture.code.ts"
import { domain } from "akasha/domain/domain.page-type.ts"
import {
  aType,
  bodyOf,
  HELD_PAGE,
  HELD_SLUG,
  idOf,
  indexedRepo,
  NAMER_PAGE,
  pageOf,
  scratch,
  textIn,
} from "akasha/page/index/test-fixtures/fixture-world/fixture-world.test-fixture.code.ts"
import { pageType } from "akasha/page/type/page-type.page-type.ts"

afterAll(scratch.sweep)

const PAGE = "akasha/one/held.module.ts"

const KEPT = "kept"

const WHOLE = `export const held = {
  id: "01a04a4a-0000-7000-8000-000000000008",
  pageTypeSlug: "module",
  slug: "held",
} as const
`

function holding(body: string): (path: string) => string | null {
  return bodyAt(PAGE, body)
}

function worldIn(root: string, textOf: (path: string) => string | null): World {
  return worldAt(root, textOf, running)
}

function bodiesOf(said: Answer, world: World): ReadonlyMap<string, string | null> {
  return bodiesIn(said, world.base)
}

function whyOf(at: string, to: string, textOf: (path: string) => string | null): string {
  const world = worldIn(scratch.rootFor("slug-renaming-"), textOf)
  const said = slugRenamed(world, { at, to })
  expect(said.edits).toEqual([])
  return said.refused ?? ""
}

test("a path that is no `.ts` file is refused", () => {
  expect(whyOf("akasha/one/held.md", KEPT, () => null)).toBe(
    "`akasha/one/held.md` is no `.ts` file"
  )
})

test("a body that could not be read is refused", () => {
  expect(whyOf(PAGE, KEPT, () => null)).toBe(`\`${PAGE}\` could not be read`)
})

test("a body stating no slug is refused", () => {
  const body = WHOLE.replace(`  slug: "held",\n`, "")
  expect(whyOf(PAGE, KEPT, holding(body))).toBe(`\`${PAGE}\` states no \`slug\``)
})

test("a body stating no page type is refused", () => {
  const body = WHOLE.replace(`  pageTypeSlug: "module",\n`, "")
  expect(whyOf(PAGE, KEPT, holding(body))).toBe(`\`${PAGE}\` states no \`pageTypeSlug\``)
})

test("a body stating no id is refused", () => {
  const body = WHOLE.replace(`  id: "01a04a4a-0000-7000-8000-000000000008",\n`, "")
  expect(whyOf(PAGE, KEPT, holding(body))).toBe(`\`${PAGE}\` states no \`id\``)
})

test("a body exporting no name its slug makes is refused", () => {
  const body = WHOLE.replace("export const held", "export const it")
  expect(whyOf(PAGE, KEPT, holding(body))).toBe(
    `\`${PAGE}\` exports no \`${HELD_SLUG}\`, the name its slug makes`
  )
})

test("a name that is no slug is refused", () => {
  expect(whyOf(PAGE, "Kept", holding(WHOLE))).toBe(
    "`Kept` is no slug, a slug being lower kebab case"
  )
  expect(whyOf(PAGE, "kept-", holding(WHOLE))).toBe(
    "`kept-` is no slug, a slug being lower kebab case"
  )
})

test("a name past the length a page's slug holds is refused", () => {
  const past = `kept-${"a".repeat(96)}`
  expect(past.length).toBe(101)
  expect(whyOf(PAGE, past, holding(WHOLE))).toBe(
    `\`${past}\` runs to 101 characters, past the 100 a page's slug holds`
  )
})

test("a name at that length is taken, so the ceiling is the length past it", () => {
  const at = `kept-${"a".repeat(95)}`
  expect(at.length).toBe(100)
  const world = worldIn(scratch.rootFor("slug-renaming-"), holding(WHOLE))
  const said = slugRenamed(world, { at: PAGE, to: at })
  expect(said.refused).toBe(null)
  expect(bodyAfter(said, world, PAGE)).toContain(`slug: "${at}"`)
})

test("the slug it already carries is refused", () => {
  expect(whyOf(PAGE, HELD_SLUG, holding(WHOLE))).toBe(
    `\`${HELD_SLUG}\` is the slug it already carries`
  )
})

test("an index naming no other page restates the slug over the page's own body", () => {
  const world = worldIn(scratch.rootFor("slug-renaming-"), holding(WHOLE))
  const said = slugRenamed(world, { at: PAGE, to: KEPT })
  expect(said.refused).toBe(null)
  expect([...bodiesOf(said, world).keys()]).toEqual([PAGE])
  expect(bodyAfter(said, world, PAGE)).toContain(`slug: "${KEPT}"`)
})

test("a value the page states that is its own slug is restated with the slug", () => {
  const body = WHOLE.replace(`  slug: "held",\n`, `  slug: "held",\n  resourceName: "held",\n`)
  const world = worldIn(scratch.rootFor("slug-renaming-"), holding(body))
  const said = slugRenamed(world, { at: PAGE, to: KEPT })
  expect(said.refused).toBe(null)
  expect(bodyAfter(said, world, PAGE)).toContain(`resourceName: "${KEPT}"`)
})

test("the page type a page states is left alone where its own slug spells the same", () => {
  const body = WHOLE.replace(`  pageTypeSlug: "module",\n`, `  pageTypeSlug: "held",\n`)
  const world = worldIn(scratch.rootFor("slug-renaming-"), holding(body))
  const said = slugRenamed(world, { at: PAGE, to: KEPT })
  expect(said.refused).toBe(null)
  expect(bodyAfter(said, world, PAGE)).toContain(`pageTypeSlug: "${HELD_SLUG}"`)
})

test("a slug a page of that page type carries already is refused", () => {
  const root = indexedRepo()
  const said = slugRenamed(worldIn(root, textIn(root)), { at: HELD_PAGE, to: "namer" })
  expect(said.edits).toEqual([])
  expect(said.refused).toBe("a `module` carries the slug `namer` already")
})

test("a namer that could not be read is refused", () => {
  const root = indexedRepo()
  const text = textIn(root)
  const world = worldIn(root, (path) => (path === NAMER_PAGE ? null : text(path)))
  const said = slugRenamed(world, { at: HELD_PAGE, to: KEPT })
  expect(said.edits).toEqual([])
  expect(said.refused).toBe(`\`${NAMER_PAGE}\` names this page and could not be read`)
})

test("the page's own slug and every name of it are restated", () => {
  const root = indexedRepo()
  const world = worldIn(root, textIn(root))
  const said = slugRenamed(world, { at: HELD_PAGE, to: KEPT })
  expect(said.refused).toBe(null)
  expect([...bodiesOf(said, world).keys()].sort()).toEqual([HELD_PAGE, NAMER_PAGE])
  expect(bodyAfter(said, world, HELD_PAGE)).toContain(`"slug": "${KEPT}"`)
  expect(bodyAfter(said, world, HELD_PAGE)).not.toContain(`"${HELD_SLUG}"`)
  expect(bodyAfter(said, world, NAMER_PAGE)).toContain(`"note": "${KEPT}"`)
  expect(bodyAfter(said, world, NAMER_PAGE)).toContain(`"module/${KEPT}"`)
  expect(bodyAfter(said, world, NAMER_PAGE)).not.toContain(HELD_SLUG)
})

test("each body is answered beside the body it was worked out from", () => {
  const root = indexedRepo()
  const world = worldIn(root, textIn(root))
  const said = slugRenamed(world, { at: HELD_PAGE, to: KEPT })
  expect(said.refused).toBe(null)
  for (const one of said.edits) {
    expect(one.kind).toBe("replace")
  }
  expect([...bodiesOf(said, world).keys()].sort()).toEqual([HELD_PAGE, NAMER_PAGE])
})

test("the page's exported const is renamed with its slug", () => {
  const root = indexedRepo()
  const world = worldIn(root, textIn(root))
  const said = slugRenamed(world, { at: HELD_PAGE, to: KEPT })
  expect(said.refused).toBe(null)
  expect(bodyAfter(said, world, HELD_PAGE)).toContain(`export const ${KEPT} =`)
  expect(bodyAfter(said, world, HELD_PAGE)).not.toContain(`export const ${HELD_SLUG} =`)
})

test("the bodies are answered rather than written", () => {
  const root = indexedRepo()
  const text = textIn(root)
  const said = slugRenamed(worldIn(root, text), { at: HELD_PAGE, to: KEPT })
  expect(said.refused).toBe(null)
  expect(text(HELD_PAGE)).toContain(`"slug": "${HELD_SLUG}"`)
  expect(text(NAMER_PAGE)).toContain(`"note": "${HELD_SLUG}"`)
})

test("the slug and the export are answered here, reaching nothing", () => {
  const reached: string[] = []
  const root = indexedRepo()
  const text = textIn(root)
  const world = worldAt(root, text, listing(reached))

  const said = slugRenamed(world, { at: HELD_PAGE, to: KEPT })

  expect(said.refused).toBe(null)
  expect(reached).toEqual([])
  expect(bodyAfter(said, world, HELD_PAGE)).toContain(`"slug": "${KEPT}"`)
  expect(bodyAfter(said, world, HELD_PAGE)).toContain(`export const ${KEPT} =`)
})

const KEYED_PROPERTY = "module-held-note"

const KEYED_KEY = "heldNote"

const KEYED_NAMER = "akasha/two/keyed.module.ts"

const KEYED_ABOVE = [`${pageType.slug}/${domain.slug}`]

const KEYED_DECLARES = ["code", "test", "note", "part-slugs", KEYED_PROPERTY]

const KEYED_MODULE = aType(idOf("6"), "module", KEYED_ABOVE, KEYED_DECLARES)

const KEYED_PROPERTY_PAGE = {
  id: idOf("d"),
  pageTypeSlug: "relation-property",
  slug: KEYED_PROPERTY,
  propertySlug: "held-note",
  definition: "a name a page writes under a key this slug does not spell",
  targetPageType: "module",
}

const KEYED_NAMER_PAGE = {
  id: "01a04a4a-0004-7000-8000-000000000001",
  pageTypeSlug: "module",
  slug: "keyed",
  definition: "a page naming another under such a key",
  [KEYED_KEY]: HELD_SLUG,
}

function keyedRepo(): string {
  return indexedRepo({
    "akasha/module.page-type.ts": bodyOf(KEYED_MODULE[1]),
    [`akasha/${KEYED_PROPERTY}.relation-property.ts`]: bodyOf(KEYED_PROPERTY_PAGE),
    [KEYED_NAMER]: pageOf(KEYED_NAMER_PAGE),
  })
}

test("a namer is filed under its property page's slug rather than under its key", () => {
  const root = keyedRepo()
  const world = worldIn(root, textIn(root))
  expect(world.index.namersOf(idOf("8"))).toContainEqual({
    path: KEYED_NAMER,
    propertySlug: KEYED_PROPERTY,
  })
})

test("a name under a key its property page's slug does not spell is restated", () => {
  const root = keyedRepo()
  const world = worldIn(root, textIn(root))
  const said = slugRenamed(world, { at: HELD_PAGE, to: KEPT })
  expect(said.refused).toBe(null)
  expect(bodyAfter(said, world, KEYED_NAMER)).toContain(`"${KEYED_KEY}": "${KEPT}"`)
  expect(bodyAfter(said, world, KEYED_NAMER)).not.toContain(`"${HELD_SLUG}"`)
})
