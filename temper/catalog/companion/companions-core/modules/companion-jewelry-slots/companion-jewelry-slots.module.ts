import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionJewelrySlots = {
  id: "01a06108-0768-71aa-84ff-35a84fc802c0",
  type: "page-type/module",
  slug: "companion-jewelry-slots",
  definition: "every place on a companion a piece of jewelry is worn",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A slot's facts are read from its page; its id and place stay here.",
    },
  ],
  hashIndexed: ["COMPANION_JEWELRY_SLOT_DATA"],
  createdAt: "2026-09-02T07:31:51.272Z",
  updatedAt: "2026-09-26T17:03:06.000Z",
} as const satisfies Module
