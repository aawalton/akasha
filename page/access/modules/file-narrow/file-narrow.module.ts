import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const fileNarrow = {
  id: "01a05bd6-c52f-7f44-b6f3-f394856e4e4c",
  type: "module",
  slug: "file-narrow",
  definition: "the narrows a file-backed page listing is asked by",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A narrow on a path holds where some value that path reaches holds it.",
    },
    {
      invariantKind: "departure",
      statement: "A narrow on a path is weighed here rather than asked of the service.",
    },
  ],
} as const satisfies Module
