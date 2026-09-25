import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const treeRowFields = {
  id: "01a0d998-39b9-77df-b659-b2eda969cf8f",
  type: "page-type/module",
  slug: "tree-row-fields",
  definition: "the zod fields every row of every tree the editor draws carries",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Each tree's row schema spreads these fields and adds its own.",
    },
  ],
} as const satisfies Module
