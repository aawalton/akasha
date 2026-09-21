import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const relatedPagesCoalesce = {
  id: "01a05cb4-fefb-710f-afea-bda26574d4e0",
  type: "page-type/module",
  slug: "related-pages-coalesce",
  definition: "related pages fetched once for every reader asking at the same moment",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Pages asked for by id and pages asked for by slug are two reads.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The store holding pages through a failed read is asked by id alone.",
    },
  ],
} as const satisfies Module
