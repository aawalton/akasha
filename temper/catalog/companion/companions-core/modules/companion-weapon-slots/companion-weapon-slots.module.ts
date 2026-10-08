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
      statement: "A slot's name is read from its page; its id and place stay here.",
    },
  ],
  hashIndexed: ["COMPANION_WEAPON_SLOT_DATA"],
  createdAt: "2026-09-02T07:31:51.279Z",
  updatedAt: "2026-09-26T17:03:06.000Z",
} as const satisfies Module
