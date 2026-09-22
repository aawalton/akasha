import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const endingAnchor = {
  id: "01a0c9df-e52b-7a12-b90e-1967b107f536",
  type: "page-type/module",
  slug: "ending-anchor",
  definition: "the bytes ending an offset, which say a file still reads there the way it did",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An anchor is the sixty-four bytes ending the offset written in base sixty-four.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An offset at or before the first byte yields no anchor.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file no longer reaching the offset yields no anchor.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file that cannot be opened or read yields no anchor rather than throwing.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes to disk.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here holds what an anchor was taken for.",
    },
  ],
} as const satisfies Module
