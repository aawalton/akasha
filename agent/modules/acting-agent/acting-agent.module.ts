import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const actingAgent = {
  id: "01a0695a-d2ea-7a99-a3a1-d0a96d1db913",
  type: "page-type/module",
  slug: "acting-agent",
  definition: "the id of the agent that runs this code",
  code: "ts",
} as const satisfies Module
