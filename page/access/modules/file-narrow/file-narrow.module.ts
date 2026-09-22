import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const fileNarrow = {
  id: "01a05bd6-c52f-7f44-b6f3-f394856e4e4c",
  type: "page-type/module",
  slug: "file-narrow",
  definition: "the narrows asked of a file-backed page listing",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A narrow on a path holds where some value that path reaches holds it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A narrow on a path is weighed here rather than asked of the service.",
    },
  ],
} as const satisfies Module
