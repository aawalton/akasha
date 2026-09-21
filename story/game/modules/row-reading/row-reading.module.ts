import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const rowReading = {
  id: "01a0c64d-a823-7215-9e79-47ac142bb83a",
  type: "page-type/module",
  slug: "row-reading",
  definition: "the rows one of a game's files holds, read where an agent cannot read them",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A file a game states but has nowhere reads as no rows rather than refusing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line that is no json refuses the whole file and says which line.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A blank line is no row.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads what a row means.",
    },
  ],
} as const satisfies Module
