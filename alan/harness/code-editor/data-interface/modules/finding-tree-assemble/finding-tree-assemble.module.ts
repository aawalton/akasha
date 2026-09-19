import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const findingTreeAssemble = {
  id: "01a0b733-1334-745d-9d31-186baa85e4a2",
  type: "page-type/module",
  slug: "finding-tree-assemble",
  definition: "the findings read out of the pages, each hung on the domain that finding names",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A finding hangs under the domain that finding names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A finding is drawn as the sentence that finding says.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A finding opens the file that finding is written in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The findings of one domain are ordered by the name each finding is filed under.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A finding missing the domain it is of or the sentence it says is skipped.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here nests the domains or counts what hangs on them.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a file the editor holds.",
    },
  ],
} as const satisfies Module
