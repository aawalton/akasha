import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const skillLockProbePoints = {
  id: "01a17ff8-9a7f-77ef-810d-6d970f9516e1",
  type: "page-type/page-type",
  slug: "skill-lock-probe-points",
  definition: "the unspent attribute points a character in the test story holds",
  extends: ["page-type/metric-character-point"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A character earns attribute points on a level up, and spends each on one stat.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-10-28T00:46:04.001Z",
  updatedAt: "2026-10-28T00:46:04.001Z",
} as const satisfies PageType
