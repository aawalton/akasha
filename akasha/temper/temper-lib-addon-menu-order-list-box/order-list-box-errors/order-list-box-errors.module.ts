import type { Module } from "@akasha/code-system/module"

export const orderListBoxErrors = {
  id: "01a06207-bdf4-7de2-8e7c-b6bc01888758",
  pageTypeSlug: "module",
  slug: "order-list-box-errors",
  definition: "the complaints made about entries a caller shaped wrongly",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A complaint names the entry index the caller got wrong.",
    },
    {
      invariantKind: "departure",
      statement: "A complaint reaches the chat window rather than halting the panel.",
    },
  ],
} as const satisfies Module
