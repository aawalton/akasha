import type { ComputedPropertyModule } from "akasha/page/computed-property-module/computed-property-module.page-type.types.ts"

export const closenessLevelClimbing = {
  id: "01a0de40-70c1-7117-995f-89c63500b732",
  type: "page-type/computed-property-module",
  slug: "closeness-level-climbing",
  definition: "the rung of the closeness ladder a count of points reaches",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A level is the highest rung the points have reached or passed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Points of zero or fewer are level 0.",
    },
  ],
  createdAt: "2026-09-26T15:06:00.257Z",
  updatedAt: "2026-09-26T15:06:11.000Z",
} as const satisfies ComputedPropertyModule
