import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const markdownRenderer = {
  id: "01a06205-4f3b-7001-926c-c56c490d0fc4",
  type: "page-type/module",
  slug: "markdown-renderer",
  definition: "Markdown rendered as elements, with mentions resolved and headings sectioned.",
  code: "tsx",
  test: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A link whose address names a page is drawn as a link to where that page is read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A link naming a page no reader has found yet is drawn as its words alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A link finds its page by the address the page resolver keys that page by.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An image whose address names an image page is drawn as a link of its words.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Pressing that link opens the image whole over the page, as a turn's cover opens.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An image whose address names a page that is no image is drawn as its words alone.",
    },
  ],
} as const satisfies Module
