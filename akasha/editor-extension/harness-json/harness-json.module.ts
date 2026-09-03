import type { Module } from "../../code-system/modules/module.page-type.ts"

export const harnessJson = {
  id: "01a0686b-bfe9-7527-8ee9-4045644edf25",
  pageTypeSlug: "module",
  slug: "harness-json",
  definition: "a harness command run for the one JSON value that command prints",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A command's whole output is read as one JSON value.",
    },
    {
      invariantKind: "constraint",
      statement: "A command printing what is no JSON is refused by the file's name.",
    },
    {
      invariantKind: "departure",
      statement: "A command is named by its file or by the name the harness files it under.",
    },
    {
      invariantKind: "departure",
      statement: "A command has thirty seconds to answer.",
    },
    {
      invariantKind: "departure",
      statement: "An answer is read up to eight mebibytes.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here knows what any answer means.",
    },
  ],
} as const satisfies Module
