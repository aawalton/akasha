import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionArmorSlots = {
  id: "01a06108-0761-7fc9-97df-bfad364def9c",
  type: "page-type/module",
  slug: "companion-armor-slots",
  definition: "every place on a companion a piece of body armor is worn",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A slot's name and equip type are read from its page; its id and place stay here.",
    },
  ],
  hashIndexed: ["COMPANION_ARMOR_SLOT_DATA"],
  createdAt: "2026-09-02T07:31:51.265Z",
  updatedAt: "2026-09-26T17:03:06.000Z",
} as const satisfies Module
