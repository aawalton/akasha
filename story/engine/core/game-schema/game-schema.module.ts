import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const gameSchema = {
  id: "01a05b71-e543-7c87-8c6e-cfaef2c52761",
  pageTypeSlug: "module",
  slug: "game-schema",
  definition: "what a game puts on screen, how often it looks for more, and how it alerts",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An awen game is framed edge to edge and in focus.",
    },
    {
      invariantKind: "departure",
      statement: "A sheet panel may only ask for reveal keys the code names.",
    },
  ],
} as const satisfies Module
