import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const indexing = {
  id: "01a04a62-b0ad-71cf-ae80-7af5dfb84ffd",
  pageTypeSlug: "module",
  type: "module",
  slug: "indexing",
  definition: "the index entries the pages imply",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An index file is replaced whole rather than appended to.",
    },
    {
      invariantKind: "departure",
      statement: "One rule writes a filing into an index wherever that index sits.",
    },
    {
      invariantKind: "departure",
      statement: "A rebuild reads the index only to find the values no page has.",
    },
    {
      invariantKind: "departure",
      statement:
        "An edge for a specifier naming a package is filed from the manifests the pages state.",
    },
    {
      invariantKind: "departure",
      statement:
        "A property whose file has a fixed name claims no file named for a slug and a page type.",
    },
    {
      invariantKind: "departure",
      statement:
        "A rebuild sets up the index the rebuild writes before the rebuild reads the index.",
    },
    {
      invariantKind: "departure",
      statement: "A rebuild sweeps the paths belonging to no index before filing an entry.",
    },
    {
      invariantKind: "departure",
      statement:
        "The repository root is given to the index rather than derived from where the index sits.",
    },
    {
      invariantKind: "departure",
      statement: "The fixture has the `id` and `slug` property pages themselves.",
    },
    {
      invariantKind: "departure",
      statement: "A world carrying pages and declaring no property unique is refused.",
    },
    {
      invariantKind: "departure",
      statement:
        "A settle's report names the refusals the world had beside the refusals a change leaves.",
    },
  ],
} as const satisfies Module
