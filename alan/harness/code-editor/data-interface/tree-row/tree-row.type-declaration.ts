import type { TypeDeclaration } from "akasha/code/type-declaration/type-declaration.page-type.types.ts"

export const treeRow = {
  id: "01a07254-9a16-7f32-8d54-29daa3227516",
  type: "page-type/type-declaration",
  slug: "tree-row",
  definition: "the fields every row of every tree the editor draws carries",
  d: "ts",
  decisions: [
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
      statement: "A tree's own row type takes these fields and adds its own fields.",
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
} as const satisfies TypeDeclaration
