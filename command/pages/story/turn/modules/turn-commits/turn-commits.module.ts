import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const turnCommits = {
  id: "01a0eb3a-ee7b-7f63-b2b3-11c384af2550",
  type: "page-type/module",
  slug: "turn-commits",
  definition: "the commit adding a played turn's page, and a file's body at a commit",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The commit adding a file is the latest commit that added it, whatever that commit says.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A git that fails throws rather than reads as a log with no commit in it.",
    },
  ],
  createdAt: "2026-09-29T03:35:03.035Z",
  updatedAt: "2026-10-28T15:02:27.222Z",
} as const satisfies Module
