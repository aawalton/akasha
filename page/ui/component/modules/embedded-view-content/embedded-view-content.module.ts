import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const embeddedViewContent = {
  id: "01a0e9cb-1042-7fd6-ab8e-029d3c46b2bc",
  type: "page-type/module",
  slug: "embedded-view-content",
  definition: "the view a page's type embeds, drawn beneath that page and narrowed to it",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A page draws the first view its page type embeds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page whose page type embeds no view draws nothing here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The view lists the pages whose relation names the page drawing it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A setting changed in the view is saved to the view rather than to the address.",
    },
  ],
} as const satisfies Module
