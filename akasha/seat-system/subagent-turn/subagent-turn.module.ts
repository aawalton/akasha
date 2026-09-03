import type { Module } from "@akasha/code-system/module"

export const subagentTurn = {
  id: "01a0695a-d2ea-7346-92de-7df1ec356ad5",
  pageTypeSlug: "module",
  slug: "subagent-turn",
  definition: "a subagent working while its page is there and the seat above it is not stopped",
  code: "ts",
} as const satisfies Module
