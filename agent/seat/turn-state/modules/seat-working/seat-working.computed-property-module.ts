import type { ComputedPropertyModule } from "akasha/page/computed-property-module/computed-property-module.page-type.types.ts"

export const seatWorking = {
  id: "01a0ed14-07ed-7558-abc4-c5cdbd32e4ee",
  type: "page-type/computed-property-module",
  slug: "seat-working",
  definition: "whether any seat in a set of seats is working",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A set of seats is working while one seat in it is in the `working` turn state.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat that is idle, stopped or states no turn state is not working.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An empty set of seats is not working.",
    },
  ],
  createdAt: "2026-09-29T12:11:48.077Z",
  updatedAt: "2026-10-30T14:44:23.538Z",
} as const satisfies ComputedPropertyModule
