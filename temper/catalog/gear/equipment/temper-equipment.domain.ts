import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const temperEquipment = {
  id: "01a060d5-2f11-79b8-9e55-62a1973c12cc",
  type: "page-type/domain",
  slug: "temper-equipment",
  definition: "the types of an Elder Scrolls Online gear set and the pieces it covers",
  parts: [
    "module/armor-traits",
    "module/armor-weight-ids",
    "module/eso-trait-map",
    "module/jewelry-traits",
    "module/set-category-ids",
    "module/set-ids",
    "module/set-ids-a-to-o",
    "module/set-ids-p-to-z",
    "module/set-patterns",
    "module/set-template",
    "module/weapon-traits",
    "module/weapon-type-ids",
    "domain/temper-equipment-kind",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The generated table of gear sets is outside akasha.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every set id here is written out from the set pages rather than by hand.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A trait moved to another place breaks every build hash saved.",
    },
  ],
} as const satisfies Domain
