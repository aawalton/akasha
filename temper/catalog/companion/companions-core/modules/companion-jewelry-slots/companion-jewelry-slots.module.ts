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
      statement: "This table is written out from the companion pages rather than by hand.",
    },
  ],
  hashIndexed: ["COMPANION_JEWELRY_SLOT_DATA"],
} as const satisfies Module
