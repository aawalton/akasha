import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const bodyOwing = {
  id: "01a094da-202e-7f5c-9796-4cb998a655c5",
  type: "page-type/module",
  slug: "body-owing",
  definition: "which of the files a read left over are still owed a body",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A file whose body the record already holds whole is owed no body.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file the agent read only part of is owed its body.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file whose body moved since the agent read it is owed its body.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file that will not open is owed its body rather than passed over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The order the files were left in is kept.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads or writes a page.",
    },
  ],
} as const satisfies Module
