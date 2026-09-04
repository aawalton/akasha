import type { Module } from "@akasha/code-system/module"

export const pageTypeDescent = {
  id: "01a04eca-11d6-7481-9151-c390edc031c2",
  pageTypeSlug: "module",
  slug: "page-type-descent",
  definition: "which page types stand under a given page type",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Descent is worked out from the page type pages themselves.",
    },
    {
      invariantKind: "departure",
      statement: "A page type stands under itself.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page type naming a parent no page type holds is left out rather than treated as having no parent.",
    },
    {
      invariantKind: "departure",
      statement: "A caller holding the index as its change leaves it is answered from that.",
    },
    {
      invariantKind: "departure",
      statement: "A caller names the reading and the reader of page bodies.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here walks the pages.",
    },
  ],
} as const satisfies Module
