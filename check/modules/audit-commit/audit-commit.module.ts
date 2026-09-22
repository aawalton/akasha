import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const auditCommit = {
  id: "01a0caa3-aade-780a-814b-9d7422a6dfe0",
  type: "page-type/module",
  slug: "audit-commit",
  definition: "the files a commit holds, read as the pages they are",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An audit is handed what a commit holds rather than what a change carries.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The files a commit holds are the files that commit's index names.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A job checks its commit out clean, so the files on disk are that commit's.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A body is read off disk at the path the index names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page read at a path is kept, so a second reader of that path reads no file.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One index answers over a commit, and every audit of that commit asks it.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here names a change, what a change carries, or what a change left.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement:
        "A check says which of a commit's files that check judges, and this reads the rest.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here judges anything.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A rule is handed in here, and a refusal it gives back names the path it was read at.",
    },
  ],
} as const satisfies Module
