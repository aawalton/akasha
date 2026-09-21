import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const featureRequestStanding = {
  id: "01a0c4af-4fde-7ecd-9cc5-4dbeb9eaf2c5",
  type: "page-type/select-property",
  slug: "feature-request-standing",
  propertySlug: "standing",
  definition: "where a feature request has reached between proposed and settled",
  values: ["proposed", "published", "completed", "denied"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A feature request Alan has not approved is `proposed`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A request whose points are burned is `completed`, and one refunded is `denied`.",
    },
  ],
  types: "ts",
} as const satisfies SelectProperty
