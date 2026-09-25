import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const subagentCheckpoints = {
  id: "01a0686b-bfe9-752c-8f69-90fe541e5755",
  type: "page-type/module",
  slug: "subagent-checkpoints",
  definition:
    "where a seat's fold was banked, with the bytes that say the file still reads that way",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A checkpoint is the offset and the anchor and the state taken together.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The state a checkpoint keeps says when each subagent's end was read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A book that does not parse is read as no book.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A book of another version is read as no book.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The book is written beside and renamed over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The book sits under the ops cache in the home directory.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here folds a transcript.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Several extension hosts share one book.",
    },
  ],
} as const satisfies Module
