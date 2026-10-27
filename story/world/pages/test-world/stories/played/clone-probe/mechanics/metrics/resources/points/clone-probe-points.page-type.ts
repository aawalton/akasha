import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const cloneProbePoints = {
  id: "01a17f4c-d936-7153-b5ae-90be24dde8cc",
  type: "page-type/page-type",
  slug: "clone-probe-points",
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
  createdAt: "2026-10-27T21:38:27.218Z",
  updatedAt: "2026-10-27T21:38:27.218Z",
} as const satisfies PageType
