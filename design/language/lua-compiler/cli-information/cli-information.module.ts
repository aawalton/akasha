import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const cliInformation = {
  id: "01a06758-8e63-7001-9614-eb554b7d073c",
  type: "module",
  slug: "cli-information",
  definition: "the text the compiler prints to describe itself and its options",
  code: "ts",
} as const satisfies Module
