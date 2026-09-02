import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const weaponTypeConstants = {
  id: "01a06127-664b-74e0-9590-d80f5209e436",
  pageTypeSlug: "module",
  slug: "weapon-type-constants",
  definition:
    "the weapon type numbers the game client holds, each under the name the client spells it with",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Each number is read out of the client rather than written down here.",
    },
  ],
} as const satisfies Module
