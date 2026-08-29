import type { Module } from "../../code-system/module/module.page-type.ts"

export const indexing = {
  id: "01a04a62-b0ad-71cf-ae80-7af5dfb84ffd",
  pageTypeSlug: "module",
  slug: "indexing",
  definition: "the index entries the pages imply",
  code: "ts",
  test: "ts",
  design: [
    {
      invariantKind: "departure",
      statement: "An index file is replaced whole, never appended to.",
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
      statement: "A body a file property holds is never loaded.",
    },
    {
      invariantKind: "departure",
      statement: "A body that will not load is reported only for a page.",
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
  ],
  intent: [
    {
      invariantKind: "gap",
      statement: "A page the index cannot read is reported, never answered as empty.",
    },
  ],
} as const satisfies Module
