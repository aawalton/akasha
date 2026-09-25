import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setRowsWriting = {
  id: "01a0d95d-99eb-74b8-9435-368d9872043c",
  type: "page-type/module",
  slug: "set-rows-writing",
  definition: "the writing of the set table a character build reads from set pages",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The table is written whole from the pages rather than mended entry by entry.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A set's row is at the build-hash place its page states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A set's category, class, metric and buff are written as the key of the page named.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page naming a page that states no key refuses rather than writing a row.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A bonus stating no effect is written with no effect.",
    },
  ],
} as const satisfies Module
