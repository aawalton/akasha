import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const keptRows = {
  id: "01a0d8af-c6f6-7f0a-a85f-4bc24a857fdd",
  type: "page-type/module",
  slug: "kept-rows",
  definition: "the rows an entry property keeps outside the commit, made into the files they fill",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Rows under an entry property the page type keeps uncommitted fill files kept beside the page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The ending already kept beside the page names those files, and `jsonl` otherwise.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A numbered file those rows no longer fill is taken away.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row arriving without an id is given one as that row is composed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row handed over that is no object is refused.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes a file.",
    },
  ],
} as const satisfies Module
