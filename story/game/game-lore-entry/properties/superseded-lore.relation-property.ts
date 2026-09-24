import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const supersededLore = {
  id: "01a0c94a-7b8e-7c09-966b-1c207111ec60",
  type: "page-type/relation-property",
  slug: "superseded-lore",
  propertySlug: "supersedes",
  definition: "the earlier lore entry a lore entry takes the place of",
  targetPageType: "page-type/game-lore-entry",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An entry superseding an earlier one leaves that earlier entry where it is.",
    },
  ],
  types: "ts",
} as const satisfies RelationProperty
