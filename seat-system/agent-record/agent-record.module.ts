import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const agentRecord = {
  id: "01a0695a-d2ea-7001-bfae-23d087490ecb",
  type: "module",
  slug: "agent-record",
  definition: "a message written to the seat a name reaches, refused where no seat has that name",
  code: "ts",
} as const satisfies Module
