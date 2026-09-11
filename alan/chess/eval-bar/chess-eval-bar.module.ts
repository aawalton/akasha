import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const chessEvalBar = {
  id: "01a05bb1-0c04-7b06-a709-8008028bbbf7",
  type: "module",
  slug: "chess-eval-bar",
  definition: "the bar drawing which side an engine score favors",
  code: "tsx",
} as const satisfies Module
