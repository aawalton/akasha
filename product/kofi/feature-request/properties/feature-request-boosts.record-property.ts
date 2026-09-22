import type { RecordProperty } from "akasha/page/record-property/record-property.page-type.types.ts"

export const featureRequestBoosts = {
  id: "01a0c4a7-faa9-7331-b4f4-8698261e526d",
  type: "page-type/record-property",
  slug: "feature-request-boosts",
  propertySlug: "boosts",
  definition: "a contributor's weight behind a feature request",
  properties: [
    { pageProperty: "relation-property/feature-request-booster", required: true, many: false },
    { pageProperty: "number-property/contribution-points", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A feature request names its boosts most points first.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One contributor boosting a request twice is one boost of the points added up.",
    },
  ],
  types: "ts",
} as const satisfies RecordProperty
