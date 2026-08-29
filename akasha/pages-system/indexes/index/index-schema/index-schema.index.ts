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
      statement: "A schema file is found by scope, then property, then value.",
    },
    {
      invariantKind: "departure",
      statement: "The scope is always `page-property`.",
    },
    {
      invariantKind: "departure",
      statement: "A line carries the page type the property is, and its target page type.",
    },
    {
      invariantKind: "departure",
      statement: "A value the property does not carry is held as null rather than left out.",
    },
    {
      invariantKind: "departure",
      statement:
        "A qualified name is held as its slug alone, and reads straight back into the index.",
    },
    {
      invariantKind: "departure",
      statement:
        "An entry is read from the property's own page alone, and no other page's change can leave it stale.",
    },
  ],
} as const satisfies Index
