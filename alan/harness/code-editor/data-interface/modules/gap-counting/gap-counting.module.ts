import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const gapCounting = {
  id: "01a0d9ae-db5e-7ea7-8573-942e452b9e09",
  type: "page-type/module",
  slug: "gap-counting",
  definition: "how many gaps the pages state, counted as the gaps panel hangs them",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The gaps counted are the gaps the picture on disk hangs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Where no picture is on disk the gaps are counted by reading every page once.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes a file.",
    },
  ],
} as const satisfies Module
