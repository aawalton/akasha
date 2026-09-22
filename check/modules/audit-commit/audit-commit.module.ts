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
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A body is given as bytes as well as text, and a check judging bytes takes the bytes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A body is read from the kind a path classifies as rather than from how that path ends.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A body is read from disk at each ask, and a check wanting one twice holds it itself.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The page an entry file sits beside is answered here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Which section names an entry file is read from the index rather than listed here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The page an entry file sits beside is composed out of that file's own name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page composed that way is answered only where that page is there to read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Answering that page takes a reading of pages rather than the whole of a commit.",
    },
  ],
} as const satisfies Module
