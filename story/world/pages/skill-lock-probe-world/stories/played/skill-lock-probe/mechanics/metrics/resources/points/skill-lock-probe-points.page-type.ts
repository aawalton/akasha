import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const skillLockProbePoints = {
  id: "01a17ff2-6f78-721a-9544-8a8dfb76c814",
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
  createdAt: "2026-10-28T00:39:19.516Z",
  updatedAt: "2026-10-28T00:39:19.516Z",
} as const satisfies PageType
