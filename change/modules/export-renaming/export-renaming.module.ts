import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const exportRenaming = {
  id: "01a09c33-ec44-72ad-8f25-59c72db27e3a",
  type: "page-type/module",
  slug: "export-renaming",
  definition:
    "how code finds the edits that rename a name that other files can import from a code file",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A name is found by the typing rather than by matching the text of a body.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name the body declares and exports nowhere is spelled anew over that body.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A body the rename would change and that reaches the new name already is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A body importing the name under another name alone is not refused for reaching the new name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A body naming no such name is left as that body is.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here says which paths the name is spelled over.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reaches a change.",
    },
  ],
  createdAt: "2026-09-13T19:17:23.652Z",
  updatedAt: "2026-10-30T17:42:09.509Z",
} as const satisfies Module
