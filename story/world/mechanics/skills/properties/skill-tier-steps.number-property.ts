import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const skillTierSteps = {
  id: "01a17ff8-40fc-7c8f-8a89-04da6013d7e5",
  type: "page-type/number-property",
  slug: "skill-tier-steps",
  propertySlug: "tier-steps",
  definition: "the experience at which each of a skill's tiers falls, lowest first",
  max: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A held skill has passed every tier its experience reaches.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A held skill whose experience reaches the last tier is completed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A skill states its tiers only where its world gives every one of them.",
    },
  ],
  types: "ts",
  createdAt: "2026-10-28T00:45:38.427Z",
  updatedAt: "2026-10-28T00:45:38.427Z",
} as const satisfies NumberProperty
