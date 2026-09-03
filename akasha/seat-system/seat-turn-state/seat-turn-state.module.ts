import type { Module } from "@akasha/code-system/module"

export const seatTurnState = {
  id: "01a0695a-d2ea-7c13-b182-16f7c69f5587",
  pageTypeSlug: "module",
  slug: "seat-turn-state",
  definition:
    "a seat read as working, idle, idle on something, or stopped, from the records it keeps",
  code: "ts",
} as const satisfies Module
