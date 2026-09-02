import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const charactersHirelingMailSubscriber = {
  id: "01a062ed-3979-7008-b38a-d2d8bc3af92b",
  pageTypeSlug: "module",
  slug: "characters-hireling-mail-subscriber",
  definition: "the standing answer to a hireling mail being looted",
  code: "ts",
  invariants: [
    {
      invariantKind: "absence",
      statement: "A loot of nothing or less is ignored.",
    },
  ],
} as const satisfies Module
