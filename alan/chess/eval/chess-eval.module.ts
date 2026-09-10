import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const chessEval = {
  id: "01a05bb1-0c04-7294-9650-348ddbdf83f3",
  pageTypeSlug: "module",
  type: "module",
  slug: "chess-eval",
  definition: "an engine score read as a fraction and as a label",
  code: "ts",
} as const satisfies Module
