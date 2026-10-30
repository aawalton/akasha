import type { ComputedPropertyModule } from "akasha/page/computed-property-module/computed-property-module.page-type.types.ts"

export const hoursBetween = {
  id: "01a0821f-8bbc-7772-a9fa-052b5f4ffb2b",
  type: "page-type/computed-property-module",
  slug: "hours-between",
  definition: "the hours between two instants",
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
  createdAt: "2026-09-08T17:45:00.604Z",
  updatedAt: "2026-10-30T16:33:41.345Z",
} as const satisfies ComputedPropertyModule
