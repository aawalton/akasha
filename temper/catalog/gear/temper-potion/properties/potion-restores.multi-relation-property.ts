import type { MultiRelationProperty } from "akasha/page/multi-relation-property/multi-relation-property.page-type.types.ts"

export const potionRestores = {
  id: "01a0e105-2a81-70e1-bb79-5efb5e7ec930",
  type: "page-type/multi-relation-property",
  slug: "potion-restores",
  propertySlug: "restores",
  definition: "the resources a potion restores at once",
  targetPageType: "page-type/temper-metric",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A potion restoring nothing states no resource.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A brewed potion's item link says what it restores, so no crafted page states this.",
    },
  ],
  types: "ts",
} as const satisfies MultiRelationProperty
