import type { Module } from "@akasha/code-system/module"

export const orderListBoxDialogs = {
  id: "01a06207-bdf0-770d-80f0-db4744058c0a",
  pageTypeSlug: "module",
  slug: "order-list-box-dialogs",
  definition: "the dialog asking for a new entry and the dialog asking before a removal",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A new entry is refused where the caller's validator rejects the text.",
    },
    {
      invariantKind: "departure",
      statement: "A removal is confirmed before the entry goes.",
    },
  ],
} as const satisfies Module
