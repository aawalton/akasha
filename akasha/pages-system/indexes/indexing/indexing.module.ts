import type { Module } from "@akasha/code-system/module"

export const indexing = {
  id: "01a04a62-b0ad-71cf-ae80-7af5dfb84ffd",
  pageTypeSlug: "module",
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
      statement: "A settle answers the reading the change leaves beside what the change files.",
    },
    {
      invariantKind: "departure",
      statement: "One rule writes a filing into an index wherever that index stands.",
    },
    {
      invariantKind: "departure",
      statement: "Identity is settled for every page in a write before any relation is.",
    },
    {
      invariantKind: "departure",
      statement: "A rebuild reads the index only to find what no page carries.",
    },
    {
      invariantKind: "departure",
      statement:
        "An edge for a specifier naming a package is filed from the manifests the pages state.",
    },
    {
      invariantKind: "departure",
      statement: "Every tree read here is read by one rule.",
    },
    {
      invariantKind: "departure",
      statement: "A body a file property holds is never loaded.",
    },
    {
      invariantKind: "departure",
      statement: "A body that will not load is reported only for a page.",
    },
    {
      invariantKind: "departure",
      statement:
        "A rebuild stands the index the rebuild writes before the rebuild reads the index.",
    },
    {
      invariantKind: "departure",
      statement: "A settle reads an index that stands nowhere yet as an index filing nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A rebuild stamps the commit the pages were read at.",
    },
    {
      invariantKind: "departure",
      statement: "A settle names on the stamp the paths it covered.",
    },
    {
      invariantKind: "departure",
      statement:
        "The repository root is given to the index rather than derived from where the index sits.",
    },
    {
      invariantKind: "departure",
      statement: "The fixture carries the `id` and `slug` property pages themselves.",
    },
    {
      invariantKind: "departure",
      statement: "A world carrying pages and declaring no property unique is refused.",
    },
    {
      invariantKind: "departure",
      statement:
        "Which properties carry a `unique` is read from the schema as the change leaves the schema.",
    },
    {
      invariantKind: "departure",
      statement:
        "A change turning a property's `unique` on or off files that property for every standing page.",
    },
    {
      invariantKind: "departure",
      statement: "What a change withdraws is read against the world standing before the change.",
    },
    {
      invariantKind: "departure",
      statement: "What a change files is read against the world the change leaves.",
    },
    {
      invariantKind: "departure",
      statement: "A name the withdrawal cannot resolve is reported rather than passed over.",
    },
    {
      invariantKind: "departure",
      statement: "An edge is withdrawn against where its specifier landed before the change.",
    },
    {
      invariantKind: "departure",
      statement: "The import filing covers importers the change does not carry.",
    },
    {
      invariantKind: "gap",
      statement: "A page the index cannot read is reported rather than answered as empty.",
    },
  ],
} as const satisfies Module
