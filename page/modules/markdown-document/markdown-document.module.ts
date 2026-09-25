import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const markdownDocument = {
  id: "01a05cc6-2a1c-7052-a972-698c701753b4",
  type: "page-type/module",
  slug: "markdown-document",
  definition: "the name a checkout goes by",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here parses or judges anything.",
    },
  ],
} as const satisfies Module
