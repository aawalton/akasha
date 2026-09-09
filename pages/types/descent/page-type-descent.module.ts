import type { Module } from "@akasha/code/module"

export const pageTypeDescent = {
  id: "01a04eca-11d6-7481-9151-c390edc031c2",
  pageTypeSlug: "module",
  type: "module",
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
        "A page type reaching no parent it names is left out rather than treated as a root.",
    },
    {
      invariantKind: "departure",
      statement: "A caller with the index as its change leaves that index is answered from that.",
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
