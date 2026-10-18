import type { ComputedPropertyModule } from "akasha/page/computed-property-module/computed-property-module.page-type.types.ts"

export const capacityHours = {
  id: "01a14f41-d566-731f-922d-5ec7a8d21f03",
  type: "page-type/computed-property-module",
  slug: "capacity-hours",
  definition: "the capacity a day's stretches give back or take away",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The capacity is worked out the same way for today and for any earlier day.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stretch still running is counted to the instant handed in.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reaches the store.",
    },
  ],
  createdAt: "2026-10-18T13:44:36.965Z",
  updatedAt: "2026-10-18T13:44:36.965Z",
} as const satisfies ComputedPropertyModule
