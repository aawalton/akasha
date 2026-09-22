import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inboundMessage = {
  id: "01a05bcd-25e2-7e66-887c-dfeac5718e84",
  type: "page-type/module",
  slug: "inbound-message",
  definition: "the shape an arriving email takes",
  code: "ts",
} as const satisfies Module
