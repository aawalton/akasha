import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const storeQuestioning = {
  id: "01a05aec-eaaa-7127-aa3c-7494fc98ae9b",
  type: "page-type/module",
  slug: "store-questioning",
  definition: "a composed query put to the store, and the answer its callers already spell",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A query names its page type under the key its callers already spell.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A test the store runs the same way is sent to the store.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A test the store does not run is run over the rows here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A test named in no vocabulary is refused rather than dropped.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Nothing is skipped or taken by the store where a test still stands to be run here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The count answered beside the rows counts everything matching rather than those rows.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A limit sent to a store answering no count is refused rather than answered.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Grouping counts the rows falling under each set of keys.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A sum or a mean passes over a row with no number.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row is answered under `values` though the store answers the row flat.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The commit the store read the rows at is answered as `at` beside them.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement: "A store answering no commit has none answered.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No answered value is parsed again as JSON.",
    },
  ],
} as const satisfies Module
