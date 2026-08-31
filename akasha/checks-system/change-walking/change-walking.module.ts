import type { Module } from "../../code-system/module/module.page-type.ts"

export const changeWalking = {
  id: "01a0583c-9b26-78cf-972c-3801c6b1ad94",
  pageTypeSlug: "module",
  slug: "change-walking",
  definition: "how a check reaches the text it judges",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "absence",
      statement: "Nothing here loads a check.",
    },
    {
      invariantKind: "departure",
      statement: "A check judging a path the change takes away walks the change itself.",
    },
    {
      invariantKind: "gap",
      statement: "Every check walks a change through this.",
    },
  ],
} as const satisfies Module
