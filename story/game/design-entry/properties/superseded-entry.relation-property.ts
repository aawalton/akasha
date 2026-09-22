import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const supersededEntry = {
  id: "01a0c93e-5e1e-76a3-bc34-ec69b13733e2",
  type: "page-type/relation-property",
  slug: "superseded-entry",
  propertySlug: "supersedes",
  definition: "the earlier entry a design entry takes the place of",
  targetPageType: "page-type/game-design-entry",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An entry superseding an earlier one leaves that earlier entry where it is.",
    },
  ],
  types: "ts",
} as const satisfies RelationProperty
