import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const heldSkillDormant = {
  id: "01a17ff8-40fc-7e95-b140-70a67bace539",
  type: "page-type/boolean-property",
  slug: "held-skill-dormant",
  propertySlug: "dormant",
  definition: "whether a character has set a held skill aside, so it holds no slot of its kind",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A holding stating nothing here is being worked on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A holding set aside keeps the tiers it passed and loses the experience past the last of them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A holding whose skill states no tiers is not set aside, since what it would lose is unknown.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only a holding whose ability kind has slots is set aside or taken up.",
    },
  ],
  types: "ts",
  createdAt: "2026-10-28T00:45:38.427Z",
  updatedAt: "2026-10-28T00:45:38.427Z",
} as const satisfies BooleanProperty
