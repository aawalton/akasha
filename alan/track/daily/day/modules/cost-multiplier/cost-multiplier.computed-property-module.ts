import type { ComputedPropertyModule } from "akasha/page/computed-property-module/computed-property-module.page-type.types.ts"

export const costMultiplier = {
  id: "01a08b93-dab4-777c-bdd0-03ab2b96ccb2",
  type: "page-type/computed-property-module",
  slug: "cost-multiplier",
  definition: "the cost of an hour in a span of time from its safety and its difficulty",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The gap a cost is read from is the safety level less the difficulty level.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tracked session a full level inside the safety level costs nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A tracked session at the safety level costs one hour for each hour that tracked session ran.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each level the gap falls beneath the match roughly doubles the cost.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A gap is read at the nearest half step.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A half step is the finest step a level moves in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tracked session stating no safety level or no difficulty level costs nothing.",
    },
  ],
  createdAt: "2026-09-10T13:48:37.940Z",
  updatedAt: "2026-10-30T17:45:53.048Z",
} as const satisfies ComputedPropertyModule
