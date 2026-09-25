import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pageTypeInheritance = {
  id: "01a05b92-a9c7-744a-849e-167e2845f2b7",
  type: "page-type/module",
  slug: "page-type-inheritance",
  definition: "the page types descending from a given page type",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A page type descends from another page type where any parent that page type names does.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page type's parents are read from the `extends` its row carries.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A parent named with its page type and a parent named by slug alone are read alike.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Descent is settled for one page type at a time rather than for a whole path.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A ring among page types is answered rather than followed round.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A parent is read here rather than through the reader that reaches files.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a file.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The page types one page type takes from are answered nearest first.",
    },
  ],
} as const satisfies Module
