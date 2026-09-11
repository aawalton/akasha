import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const inboundMessage = {
  id: "01a05bcd-25e2-7e66-887c-dfeac5718e84",
  type: "module",
  slug: "inbound-message",
  definition: "the shape an arriving email is read into",
  code: "ts",
} as const satisfies Module
