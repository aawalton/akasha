import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionWeaponSlots = {
  id: "01a06108-076f-7a7e-8d7f-1f243e2ec818",
  type: "page-type/module",
  slug: "companion-weapon-slots",
  definition: "the two hands holding a companion's weapons",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This table is written out from the companion pages rather than by hand.",
    },
  ],
  hashIndexed: ["COMPANION_WEAPON_SLOT_DATA"],
} as const satisfies Module
