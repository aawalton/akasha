import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const weaponTypeConstants = {
  id: "01a06127-664b-74e0-9590-d80f5209e436",
  type: "page-type/module",
  slug: "weapon-type-constants",
  definition: "the weapon type numbers the game client has, each under the client's own spelling",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Each number is read out of the client rather than written down here.",
    },
  ],
} as const satisfies Module
