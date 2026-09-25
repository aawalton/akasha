import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pageQuery = {
  id: "01a06579-f3d9-7000-b770-d76acf7f6945",
  type: "page-type/module",
  slug: "page-query",
  definition: "a page type's rows read from the store, whole or a page found by its title",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A truncated population is refused rather than answered as the whole population.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An empty string held at a key reads as nothing rather than as an empty answer.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page found by its title carries the commit it was asked at.",
    },
  ],
} as const satisfies Module
