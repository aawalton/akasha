import { expect, test } from "bun:test"
import type { Carried } from "@akasha/pages/page-type-properties"
import { runChange as addKey } from "../../../mechanical/file-content/add/add-page-property/add-page-property.change-mechanical-file-content.code.ts"
import { refusing } from "../../../modules/answer/change-answer.module.code.ts"
import {
  bodiesIn,
  type Reaching,
  type World,
} from "../../../modules/shadow/change-shadow.module.code.ts"
import { worldOf } from "../../../modules/shadow/change-shadow.module.test-fixtures.ts"
import {
  addPropertyToEveryPage,
  runChange,
} from "./add-property-to-every-page.change-agent.code.ts"

const RUNS: Reaching = (world, at, given) => {
  if (at === "change-mechanical-file-content/add-page-property") {
    return Promise.resolve(addKey(world, given as Parameters<typeof addKey>[1]))
  }
  return Promise.resolve(refusing(`\`${at}\` is reached by nothing here`))
}

const ONE_AT = "alan/books/one.book-section.ts"

const TWO_AT = "alan/books/two.book-section.ts"

function bodied(slug: string, parent: string): string {
  return `export const ${slug} = {
  pageTypeSlug: "book-section",
  slug: "${slug}",
  partOfSlugs: ["${parent}"],
}
`
}

const BODIES = { [ONE_AT]: bodied("one", "solar-power"), [TWO_AT]: bodied("two", "my-faith") }

const DECLARED: Carried = {
  pagePropertySlug: "section-of-slug",
  pageTypeSlug: "relation-property",
  propertySlug: "section-of-slug",
  key: "sectionOfSlug",
  unique: null,
  declaredBy: "book-section",
  required: true,
  many: false,
  maxCount: null,
  maxLength: null,
  uncommitted: false,
  secret: false,
}

const MANY: Carried = { ...DECLARED, key: "partOfSlugs", many: true }

function pagesIn(
  bodies: Readonly<Record<string, string>>,
  carried: readonly Carried[] | null
): World {
  return {
    ...worldOf(bodies),
    index: {
      everyOfType: () => Object.keys(bodies).map((path) => ({ path, id: path })),
      propertiesIfNamed: () => carried,
    } as never,
    reaching: RUNS,
  }
}

const SECTION_OF = { pageType: "book-section", key: "sectionOfSlug", value: '"solar-power"' }

test("every page of the page type gains the key", async () => {
  const world = pagesIn(BODIES, [DECLARED])

  const said = await addPropertyToEveryPage(world, SECTION_OF)

  expect(said.refused).toBeNull()
  const bodies = bodiesIn(said, world.base)
  expect(bodies.get(ONE_AT) ?? "").toContain(`sectionOfSlug: "solar-power"`)
  expect(bodies.get(TWO_AT) ?? "").toContain(`sectionOfSlug: "solar-power"`)
})

test("the key is written after the property `after` names", async () => {
  const world = pagesIn(BODIES, [DECLARED])

  const said = await addPropertyToEveryPage(world, { ...SECTION_OF, after: "slug" })

  expect(bodiesIn(said, world.base).get(ONE_AT) ?? "").toContain(
    `slug: "one",\n  sectionOfSlug: "solar-power",`
  )
})

test("a page type carrying no property under the key is refused", async () => {
  const said = await addPropertyToEveryPage(pagesIn(BODIES, []), SECTION_OF)

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/carries no property under `sectionOfSlug`/)
})

test("a page type the index does not name is refused", async () => {
  const said = await addPropertyToEveryPage(pagesIn(BODIES, null), SECTION_OF)

  expect(said.edits).toEqual([])
  expect(said.refused).toBe("`book-section` names no page type")
})

test("a key its page type says carries many values is refused", async () => {
  const said = await addPropertyToEveryPage(pagesIn(BODIES, [MANY]), {
    ...SECTION_OF,
    key: "partOfSlugs",
  })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/carries many values/)
})

test("a page type no page is of is refused rather than answered as no edit", async () => {
  const said = await addPropertyToEveryPage(pagesIn({}, [DECLARED]), SECTION_OF)

  expect(said.edits).toEqual([])
  expect(said.refused).toBe("no page is a `book-section`")
})

test("one page refused refuses the whole change, and the refusal names that page", async () => {
  const held = { [ONE_AT]: BODIES[ONE_AT] ?? "", [TWO_AT]: "const two = 1\n" }

  const said = await addPropertyToEveryPage(pagesIn(held, [DECLARED]), SECTION_OF)

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain(TWO_AT)
  expect(said.refused ?? "").toContain("exports no object")
})

test("an argument this change was handed no value for is refused by the key", async () => {
  const said = await runChange(pagesIn(BODIES, [DECLARED]), { key: "sectionOfSlug" })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/`page-type` names what this change is handed/)
})
