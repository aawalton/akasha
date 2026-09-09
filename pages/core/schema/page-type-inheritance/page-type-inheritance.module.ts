import type { Module } from "@akasha/code/module"

export const pageTypeInheritance = {
  id: "01a05b92-a9c7-744a-849e-167e2845f2b7",
  pageTypeSlug: "module",
  type: "module",
  slug: "page-type-inheritance",
  definition: "the page types descending from a given page type",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A page type descends from another page type where any parent that page type names does.",
    },
    {
      invariantKind: "departure",
      statement:
        "A parent named with its page type and a parent named by slug alone are read alike.",
    },
    {
      invariantKind: "departure",
      statement: "Descent is settled for one page type at a time rather than for a whole path.",
    },
    {
      invariantKind: "departure",
      statement: "A ring among page types is answered rather than followed round.",
    },
    {
      invariantKind: "departure",
      statement: "A parent is read here rather than through the reader that reaches files.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a file.",
    },
  ],
} as const satisfies Module
