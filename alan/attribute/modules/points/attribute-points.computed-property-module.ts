import type { ComputedPropertyModule } from "akasha/page/computed-property-module/computed-property-module.page-type.types.ts"

export const attributePoints = {
  id: "01a14f40-dae9-7d7f-a669-7ab9ba1260c7",
  type: "page-type/computed-property-module",
  slug: "attribute-points",
  definition: "the points a day earns an attribute out of what that day carries",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The points a day earns are worked out the same way for today and for any earlier day.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each attribute's page states how many of what it reads make one point.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reaches the store.",
    },
  ],
  createdAt: "2026-10-18T13:43:32.840Z",
  updatedAt: "2026-10-18T13:43:32.840Z",
} as const satisfies ComputedPropertyModule
