import type { TypeDeclaration } from "akasha/code/type-declaration/type-declaration.page-type.types.ts"

export const slashCommanderDeclarations = {
  id: "01a06066-8404-79a4-bfb3-28f543c2cd7a",
  type: "page-type/type-declaration",
  slug: "slash-commander-declarations",
  definition: "the Lua and game names this addon reaches without importing them",
  d: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Only the names the code here reaches are declared.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement: "This page restates declarations the game keeps outside akasha.",
    },
  ],
  createdAt: "2026-09-02T04:35:26.340Z",
  updatedAt: "2026-09-22T03:24:53.000Z",
} as const satisfies TypeDeclaration
