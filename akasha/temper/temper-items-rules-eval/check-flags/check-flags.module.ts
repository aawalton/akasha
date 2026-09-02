import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const checkFlags = {
  id: "01a06137-f965-79e3-938a-957ed9482203",
  pageTypeSlug: "module",
  slug: "check-flags",
  definition: "the condition check over the eight boolean flags an item carries",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every flag condition has a positive form and a negated form.",
    },
    {
      invariantKind: "departure",
      statement:
        "A flag absent from the item facts makes the condition indeterminate rather than false.",
    },
    {
      invariantKind: "departure",
      statement: "The first flag that fails ends the flag check.",
    },
    {
      invariantKind: "absence",
      statement: "No flag condition consults the evaluation environment.",
    },
  ],
} as const satisfies Module
