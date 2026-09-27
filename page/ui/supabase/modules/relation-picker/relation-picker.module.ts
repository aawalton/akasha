import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const relationPicker = {
  id: "01a06164-b506-7002-bd6a-2888defdf06d",
  type: "page-type/module",
  slug: "relation-picker",
  definition: "React hook paginating the pages a relation may point at, narrowed by a search term.",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A picker asks for pages of the type its relation points at.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A target type no page type names is asked for under the provider's own type.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A search is run by the page service rather than over pages held in the browser.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A relation naming its target type by slug is asked for under that type's id.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A search keeps a page whose title or slug holds it, whatever the case.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A type that no type above or below it titles is searched by slug alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A picked page is named as its page's header names it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A picker asks for 50 pages at a time, and loading more asks for 50 more.",
    },
  ],
} as const satisfies Module
