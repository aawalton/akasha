import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const unheldTaking = {
  id: "01a18da7-0505-768b-89bc-34934f4346c4",
  type: "page-type/module",
  slug: "unheld-taking",
  definition: "the body a change takes away from a path no commit holds",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A path on the tree that no commit holds and no ignore names is left by a landing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The landing that left such a path never committed it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A change taking such a path away takes the body on the tree.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The index entries and the rows beside other pages that body implies go with it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A landing that throws after taking such a path away puts that body back.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path the repository ignores is taken away as no body.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A folder is taken away as no body.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path a commit holds is taken away as the body that commit holds.",
    },
  ],
  createdAt: "2026-10-30T16:31:35.684Z",
  updatedAt: "2026-10-30T16:31:35.684Z",
} as const satisfies Module
