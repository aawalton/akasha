import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pageQuery = {
  id: "01a06579-f3d9-7000-b770-d76acf7f6945",
  type: "page-type/module",
  slug: "page-query",
  definition: "how code reads the rows of a page type from the store",
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
    {
      decisionKind: "decision-kind/departure",
      statement: "A whole population can be read with the commit it was asked at.",
    },
  ],
  createdAt: "2026-09-03T04:14:46.233Z",
  updatedAt: "2026-10-30T15:19:56.498Z",
} as const satisfies Module
