import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const armorTypeConstants = {
  id: "01a06127-661f-7ab9-8fd2-c12787790998",
  pageTypeSlug: "module",
  slug: "armor-type-constants",
  definition:
    "the armor weight numbers the game client holds, each under the name the client spells it with",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Each number is read out of the client rather than written down here.",
    },
  ],
} as const satisfies Module
