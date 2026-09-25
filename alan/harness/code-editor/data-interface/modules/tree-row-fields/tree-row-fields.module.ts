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
    {
      decisionKind: "decision-kind/departure",
      statement: "The row type every tree shares is inferred from these fields.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One name is used for one thing across every tree the editor draws.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tree names its own row type.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every panel draws the row its tree's file has rather than a row spelled again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row has its children under the type that row is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A value that is absent is null rather than missing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path is whole.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The service knows the checkout the editor does not join.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A color is a name rather than a value.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The editor has the color each name is drawn as.",
    },
  ],
} as const satisfies Module
