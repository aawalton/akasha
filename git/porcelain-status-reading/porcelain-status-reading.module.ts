import type { Module } from "@akasha/code-system/module"

export const porcelainStatusReading = {
  id: "01a06816-2f10-7367-b0af-3052e7774a7c",
  pageTypeSlug: "module",
  slug: "porcelain-status-reading",
  definition: "a repository's status asked of git and read into entries",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The status is asked for with the arguments the porcelain status names.",
    },
    {
      invariantKind: "departure",
      statement: "Untracked files are asked about only where a caller says how much to ask.",
    },
    {
      invariantKind: "departure",
      statement: "A list of paths narrows the status to those paths.",
    },
    {
      invariantKind: "departure",
      statement: "What git said is handed on untrimmed.",
    },
    {
      invariantKind: "departure",
      statement: "A status git would not give is answered with why rather than thrown.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the columns of a record itself.",
    },
  ],
} as const satisfies Module
