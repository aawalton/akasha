import type { Module } from "@akasha/code-system/module"

export const lastLines = {
  id: "01a072f7-0ad2-7488-b3d1-84f71af5a19c",
  pageTypeSlug: "module",
  slug: "last-lines",
  definition: "the last lines of a file",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A file is read from its end backwards rather than whole.",
    },
    {
      invariantKind: "departure",
      statement: "Reading ends once one line more than the caller asked for has been read.",
    },
    {
      invariantKind: "departure",
      statement: "The line ending closing a file opens no line of its own.",
    },
    {
      invariantKind: "departure",
      statement: "A file holding fewer lines than the caller asked for answers with all it holds.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here follows a file as that file grows.",
    },
  ],
} as const satisfies Module
