import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const logSource = {
  id: "01a0657c-cb14-7c6f-83df-0d533f4f7821",
  type: "page-type/page-type",
  slug: "log-source",
  definition: "a process that writes logs for seats",

  extends: ["page-type/page"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A source is named for the process writing the lines rather than for the seat.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One source writes a separate day for each seat.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A source outlives every day of lines the source wrote.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A source has nothing but the name the source is reached by.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
