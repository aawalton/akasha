import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const generateFilterDimensions = {
  id: "01a05b92-a9c7-7876-8031-2783b890904c",
  type: "page-type/module",
  slug: "generate-filter-dimensions",
  definition: "the filter dimensions a page type's properties offer",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A relation dimension carries its target type by id and by slug.",
    },
  ],
} as const satisfies Module
