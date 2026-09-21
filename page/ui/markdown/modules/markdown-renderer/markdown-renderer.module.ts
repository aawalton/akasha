import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const markdownRenderer = {
  id: "01a06205-4f3b-7001-926c-c56c490d0fc4",
  type: "page-type/module",
  slug: "markdown-renderer",
  definition: "Markdown rendered as elements, with mentions resolved and headings sectioned.",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/gap",
      statement: "A link whose address names a page is drawn as a link to where that page is read.",
    },
  ],
} as const satisfies Module
