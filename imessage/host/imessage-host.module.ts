import type { Module } from "../../code-system/modules/module.page-type.ts"

export const imessageHost = {
  id: "01a05bc9-4308-7001-a41a-2e92dace6248",
  pageTypeSlug: "module",
  slug: "imessage-host",
  definition: "the machine Alan's iMessage history stands on",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "One machine holds the message history every read here goes to.",
    },
  ],
} as const satisfies Module
