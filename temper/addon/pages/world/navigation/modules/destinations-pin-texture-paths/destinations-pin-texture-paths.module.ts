import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const destinationsPinTexturePaths = {
  id: "01a06269-290c-7e7a-95c1-d4feda9d4d8e",
  type: "page-type/module",
  slug: "destinations-pin-texture-paths",
  definition: "the texture paths open to each destination pin kind",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Each pin kind is drawn with one piece of the game's own map art.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Kinds sharing one piece of art are told apart by their tint and their tooltip.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every achievement pin kind shares the achievement icon.",
    },
  ],
} as const satisfies Module
