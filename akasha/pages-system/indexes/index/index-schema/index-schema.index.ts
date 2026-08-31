import type { Index } from "../index.page-type.ts"

export const indexSchema = {
  id: "01a04d79-852a-71ed-b817-7b06efee79d5",
  pageTypeSlug: "index",
  slug: "index-schema",
  definition: "an index from a property to the shape of the value it holds",
  indexName: "schema",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A schema file is found by scope then the page type the property is then property then value.",
    },
    {
      invariantKind: "departure",
      statement: "The scope is always `page-property`.",
    },
    {
      invariantKind: "departure",
      statement:
        "A line carries the page type the property is and its target page type and the key a page reads it by.",
    },
    {
      invariantKind: "departure",
      statement: "The page type stands in the path.",
    },
    {
      invariantKind: "departure",
      statement: "A property slug stands alone only among the pages of one property type.",
    },
    {
      invariantKind: "departure",
      statement: "Two properties carrying one slug are both filed.",
    },
    {
      invariantKind: "departure",
      statement: "A value the property does not carry is held as null rather than left out.",
    },
    {
      invariantKind: "departure",
      statement: "A qualified name is held as its slug alone.",
    },
    {
      invariantKind: "departure",
      statement: "A qualified name reads straight back into the index.",
    },
    {
      invariantKind: "departure",
      statement: "A page stating a property slug is a page property whatever page type it is.",
    },
    {
      invariantKind: "departure",
      statement: "An entry is read from the property's own page alone.",
    },
    {
      invariantKind: "departure",
      statement: "No other page's change can leave an entry stale.",
    },
  ],
} as const satisfies Index
