import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const readStdinOrFile = {
  id: "01a069da-b9b3-7442-87a9-339906b70ec3",
  type: "page-type/module",
  slug: "read-stdin-or-file",
  definition: "text read from a named file or from standard input",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A path of one dash names standard input.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file this module cannot read raises an input error.",
    },
  ],
} as const satisfies Module
