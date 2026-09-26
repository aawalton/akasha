import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionEquipmentQualities = {
  id: "01a06108-0766-785a-9dd2-ef09e0ab69e2",
  type: "page-type/module",
  slug: "companion-equipment-qualities",
  definition: "every grade of a piece of companion equipment",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A quality is read from its page rather than from a copy in code.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A quality's id stays in code, because rules name qualities by id.",
    },
  ],
} as const satisfies Module
