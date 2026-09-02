import type { Module } from "../../code-system/modules/module.page-type.ts"

export const actingAccount = {
  id: "01a05b6f-999c-79d6-962f-62b580eda479",
  pageTypeSlug: "module",
  slug: "acting-account",
  definition: "which account a seat is acting for, read back off the surface the channel wrote",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Only the text after the last channel footer is trusted.",
    },
    {
      invariantKind: "departure",
      statement: "A sender quoting the footer cannot reach past the one the channel wrote.",
    },
    {
      invariantKind: "departure",
      statement: "The account is answered in lower case.",
    },
  ],
} as const satisfies Module
