import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const turnCommits = {
  id: "01a0eb3a-ee7b-7f63-b2b3-11c384af2550",
  type: "page-type/module",
  slug: "turn-commits",
  definition: "the commits git logs over a played story's files, and a file's body at one",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A commit is read with every path it changed, and a rename is read as two paths.",
    },
  ],
} as const satisfies Module
