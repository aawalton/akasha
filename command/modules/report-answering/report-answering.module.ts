import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const reportAnswering = {
  id: "01a08e22-2013-7910-a541-1201b64bba98",
  type: "page-type/module",
  slug: "report-answering",
  definition: "a command's answer built from lines it gathers, or from the fault that stopped it",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Lines gathered without a fault are the report, and nothing went wrong.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A fault thrown while gathering is the one refusal, and it is a fault in the world.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The answer is built by the one function building a command's answer.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An answer carries a report or a refusal, never both.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here knows what the lines say or where they came from.",
    },
  ],
} as const satisfies Module
