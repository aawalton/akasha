import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const takeBackMechanics = {
  id: "01a0e7d8-5f60-7137-887e-ee26d4cf05fc",
  type: "page-type/argument",
  slug: "take-back-mechanics",
  said: "--take-back-mechanics",
  takes: "take back the mechanics lines already written for the turn, restoring each page's value",
  value: "none",
} as const satisfies Argument
