import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const lastLines = {
  id: "01a072f7-0ad2-7488-b3d1-84f71af5a19c",
  type: "module",
  slug: "last-lines",
  definition: "the last lines of a file",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A file is read from its end backwards rather than whole.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Reading ends once one line more than the caller asked for has been read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The line ending closing a file opens no line of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A file with fewer lines than the caller asked for answers with every line the file has.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here follows a file as that file grows.",
    },
  ],
} as const satisfies Module
