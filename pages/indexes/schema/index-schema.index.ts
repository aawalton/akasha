import type { Index } from "../index.page-type.ts"

export const indexSchema = {
  id: "01a04d79-852a-71ed-b817-7b06efee79d5",
  pageTypeSlug: "index",
  type: "index",
  slug: "index-schema",
  definition: "an index from a property to the shape of the value it has",
  name: "schema",
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
      statement: "A line has the property's own page type.",
    },
    {
      invariantKind: "departure",
      statement: "A line has the property's target page type.",
    },
    {
      invariantKind: "departure",
      statement: "A line has the key a page reads the property by.",
    },
    {
      invariantKind: "departure",
      statement: "A line has the name the property's file sits under.",
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
      statement: "Two properties with one slug are both filed.",
    },
    {
      invariantKind: "departure",
      statement: "A value the property does not have is held as null rather than left out.",
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
      statement:
        "A page stating a property slug is a page property whatever page type that page is.",
    },
    {
      invariantKind: "departure",
      statement: "An entry is read from the property's own page alone.",
    },
    {
      invariantKind: "departure",
      statement: "No other page's change can leave an entry stale.",
    },
    {
      invariantKind: "departure",
      statement: "A line has the name the property's folder sits under.",
    },
  ],
} as const satisfies Index
