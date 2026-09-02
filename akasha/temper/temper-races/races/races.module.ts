import type { Module } from "../../../code-system/module/module.page-type.ts"

export const races = {
  id: "01a0608a-c133-737f-a474-8e8f27869f5c",
  pageTypeSlug: "module",
  slug: "races",
  definition: "every playable race with its Elder Scrolls Online race id and its alternate name",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This code is written out from the race pages rather than by hand.",
    },
  ],
} as const satisfies Module
