import type { ComputedPropertyModule } from "akasha/page/computed-property-module/computed-property-module.page-type.types.ts"

export const hoursBetween = {
  id: "01a0821f-8bbc-7772-a9fa-052b5f4ffb2b",
  type: "page-type/computed-property-module",
  slug: "hours-between",
  definition: "the hours from one instant to another",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The hours are the same whichever instant is handed in first.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An end that is no readable instant is no reading rather than zero.",
    },
  ],
} as const satisfies ComputedPropertyModule
