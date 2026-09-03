import type { Module } from "../../code-system/modules/module.page-type.ts"

export const subagentCheckpoints = {
  id: "01a0686b-bfe9-752c-8f69-90fe541e5755",
  pageTypeSlug: "module",
  slug: "subagent-checkpoints",
  definition:
    "where a seat's fold was banked, with the bytes that say the file still reads that way",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A checkpoint is the offset, the anchor and the state taken together.",
    },
    {
      invariantKind: "departure",
      statement: "An anchor is the sixty-four bytes ending the offset, in base sixty-four.",
    },
    {
      invariantKind: "departure",
      statement: "A file no longer reaching the offset yields no anchor.",
    },
    {
      invariantKind: "departure",
      statement: "A book that does not parse is read as no book.",
    },
    {
      invariantKind: "departure",
      statement: "A book of another version is read as no book.",
    },
    {
      invariantKind: "departure",
      statement: "The book is written beside and renamed over.",
    },
    {
      invariantKind: "departure",
      statement: "The book stands under the ops cache in the home directory.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here folds a transcript.",
    },
    {
      invariantKind: "gap",
      statement: "Several extension hosts share one book.",
    },
  ],
} as const satisfies Module
