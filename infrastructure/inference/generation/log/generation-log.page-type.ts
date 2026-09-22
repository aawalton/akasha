import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const generationLog = {
  id: "01a01d18-306b-7000-9796-b41f285a1bad",
  type: "page-type/page-type",
  slug: "generation-log",
  definition: "the record kept of what a set of model services has made",
  extends: ["page-type/page"],
  parts: ["file-property/generation-runs"],
  properties: [{ pageProperty: "file-property/generation-runs", required: true, many: false }],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A generation log has its runs and their outputs beside the log rather than in pages of their own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A log is reached by the slug the inference commands are pointed at.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row is landed by appending one line to the file beside the log.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The log reaches as far as the last run an inference command made.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
