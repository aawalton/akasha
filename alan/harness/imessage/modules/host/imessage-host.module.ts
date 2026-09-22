import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const imessageHost = {
  id: "01a05bc9-4308-7001-a41a-2e92dace6248",
  type: "page-type/module",
  slug: "imessage-host",
  definition: "the machine holding Alan's iMessage history",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "One machine has the message history every read here goes to.",
    },
  ],
} as const satisfies Module
