import type { Module } from "../../code-system/modules/module.page-type.ts"

export const nameRule = {
  id: "01a05c53-bc6c-7688-b77d-c73058552b04",
  pageTypeSlug: "module",
  slug: "name-rule",
  definition: "a name written with holes in it, and what filling those holes gives",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A hole is named in lower kebab between braces.",
    },
    {
      invariantKind: "departure",
      statement: "A rule with one hole unfilled fills nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A rule filling to an empty stem fills nothing.",
    },
    {
      invariantKind: "departure",
      statement:
        "A rule whose holes are all filled but which still fills nothing answers with all of them.",
    },
  ],
} as const satisfies Module
