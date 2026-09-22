import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const temperEquipmentKind = {
  id: "01a060b8-08c3-7a47-a8fa-29a32e398b30",
  type: "page-type/domain",
  slug: "temper-equipment-kind",
  definition: "the slots, types and quality tiers naming a piece of Elder Scrolls Online gear",
  parts: [
    "module/armor-slots",
    "module/armor-types",
    "module/equipment-qualities",
    "module/jewelry-slots",
    "module/jewelry-types",
    "module/weapon-bars",
    "module/weapon-slots",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every row here answers to a page of the equipment page types.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A gear set is named outside this folder.",
    },
  ],
} as const satisfies Domain
