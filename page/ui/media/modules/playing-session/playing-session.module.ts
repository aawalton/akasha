import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const playingSession = {
  id: "01a05cb4-fefa-7fd3-8169-b0705eb64146",
  type: "page-type/module",
  slug: "playing-session",
  definition: "the state a playing session moves through",
  code: "ts",
} as const satisfies Module
