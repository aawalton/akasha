import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pageName = {
  id: "01a0d422-a41c-7f9b-aecf-07017e641d33",
  type: "page-type/module",
  slug: "page-name",
  definition: "the name a reader sees for a page",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A page with a title is named by its title.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page with no title is named by its slug, titled.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page with neither is named Untitled.",
    },
  ],
} as const satisfies Module
