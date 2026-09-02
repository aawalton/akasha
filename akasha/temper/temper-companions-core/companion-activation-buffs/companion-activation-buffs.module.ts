import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const companionActivationBuffs = {
  id: "01a06110-abe1-76b3-a5f0-27936e095c05",
  pageTypeSlug: "module",
  slug: "companion-activation-buffs",
  definition: "the buff names a companion skill shows where the shared buff table has none",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This code is written out from the companion pages rather than by hand.",
    },
  ],
} as const satisfies Module
