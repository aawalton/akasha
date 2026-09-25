import { expect, test } from "bun:test"
import {
  planned,
  type Sources,
  slugged,
} from "akasha/command/pages/temper/catalog/import-lore-books/modules/lore-book-planning/lore-book-planning.module.code.ts"

function none(): null {
  return null
}

function sources(over: Partial<Sources>): Sources {
  return { table: {}, library: {}, shalidor: {}, captured: [], ...over }
}

test("a slug drops apostrophes rather than parting a word at them", () => {
  expect(slugged("Alik'r Desert Lore")).toBe("alikr-desert-lore")
})

test("a book both sources title alike in one collection is one page", () => {
  const plan = planned(
    sources({
      table: { 20: { c: true, cn: "Skill Books", e: [], n: "Tannins" } },
      captured: [
        {
          categoryIndex: 3,
          name: "Eidetic Memory",
          collections: [
            {
              collectionIndex: 23,
              name: "Skill Books",
              books: [{ bookIndex: 78, name: "Tannins" }],
            },
          ],
        },
      ],
    }),
    none
  )
  expect(plan.collections[0]?.books).toEqual([
    {
      slug: "tannins",
      values: {
        title: "Tannins",
        esoBookId: 20,
        charted: true,
        bookIndex: 78,
        collection: "temper-lore-collection/skill-books",
      },
    },
  ])
})

test("titles that differ at all are two pages rather than a guess", () => {
  const plan = planned(
    sources({
      table: { 970: { c: true, cn: "Letters", e: [], n: "Letter From Tamien" } },
      captured: [
        {
          categoryIndex: 3,
          name: "Eidetic Memory",
          collections: [
            {
              collectionIndex: 8,
              name: "Letters",
              books: [{ bookIndex: 26, name: "Letter from Tamien" }],
            },
          ],
        },
      ],
    }),
    none
  )
  expect(plan.collections[0]?.books.map((one) => one.slug)).toEqual([
    "letter-from-tamien-3-8-26",
    "letter-from-tamien-970",
  ])
})

test("a title the table holds twice in one collection is merged with neither", () => {
  const plan = planned(
    sources({
      table: {
        430: { c: true, cn: "Crime", e: [], n: "Note" },
        2935: { c: true, cn: "Crime", e: [], n: "Note" },
      },
      captured: [
        {
          categoryIndex: 3,
          name: "Eidetic Memory",
          collections: [
            { collectionIndex: 2, name: "Crime", books: [{ bookIndex: 5, name: "Note" }] },
          ],
        },
      ],
    }),
    none
  )
  expect(plan.collections[0]?.books).toHaveLength(3)
})

test("a collection the library has an entry for carries that entry", () => {
  const plan = planned(
    sources({
      library: {
        1: { 1: { d: "Words", g: "icon.dds", h: false, k: 3, n: "Glenumbra Lore", t: 10 } },
      },
      captured: [
        {
          categoryIndex: 1,
          name: "Shalidor's Library",
          collections: [{ collectionIndex: 1, name: "Glenumbra Lore", books: [] }],
        },
      ],
    }),
    () => "glenumbra-lore"
  )
  expect(plan.collections[0]?.values).toEqual({
    title: "Glenumbra Lore",
    esoLoreCategoryId: 1,
    esoCollectionIndex: 1,
    esoLoreCollectionId: 3,
    loreCollectionDescription: "Words",
    gamepadIcon: "icon.dds",
    hidden: false,
    bookTotal: 10,
  })
})

test("a collection named only by the table has no number, and a book with no collection is unfiled", () => {
  const plan = planned(
    sources({
      table: {
        1566: { c: true, e: [], k: 1566 },
        7000: { c: true, cn: "Apology", e: [], n: "Apology" },
      },
    }),
    none
  )
  expect(plan.collections.map((one) => [one.slug, one.index])).toEqual([["apology", null]])
  expect(plan.unfiled.map((one) => one.slug)).toEqual(["book-1566"])
})
