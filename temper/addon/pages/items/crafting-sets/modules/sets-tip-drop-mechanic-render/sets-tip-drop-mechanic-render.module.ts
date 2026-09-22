import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsTipDropMechanicRender = {
  id: "01a06231-8f1e-7a46-8a06-c666a6d92267",
  type: "page-type/module",
  slug: "sets-tip-drop-mechanic-render",
  definition: "the whole drop text for a set built from its per-zone pieces",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The dungeon name follows the parent zone name in square brackets.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A set whose zones are identical is treated as a single zone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every text is built once with textures and once plain.",
    },
  ],
} as const satisfies Module
