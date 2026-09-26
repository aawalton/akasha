import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pithkaScores = {
  id: "01a0de89-fe6f-7e44-8cc4-e2ba0a0e20b9",
  type: "page-type/module",
  slug: "pithka-scores",
  definition: "each character's best trial, arena and archive scores, read from the leaderboards",
  code: "ts",
} as const satisfies Module
