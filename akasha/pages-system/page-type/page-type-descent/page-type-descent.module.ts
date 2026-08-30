import type { Module } from "../../../code-system/module/module.page-type.ts"

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
        "A page type naming a parent no page type holds is left out, rather than treated as standing under nothing.",
    },
    {
      invariantKind: "departure",
      statement:
        "A caller holding the index as its change leaves it is answered from that. One holding only a root is answered as before.",
    },
    {
      invariantKind: "absence",
      statement:
        "Nothing here walks the corpus. Every page type read is one the index named first.",
    },
  ],
} as const satisfies Module
