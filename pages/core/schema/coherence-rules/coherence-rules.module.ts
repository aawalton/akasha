import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const coherenceRules = {
  id: "01a05b92-a9c7-7f73-a319-8678d65a03e3",
  type: "module",
  slug: "coherence-rules",
  definition: "the violations a page's properties incur against its coherence rules",
  code: "ts",
} as const satisfies Module
