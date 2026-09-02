import type { Module } from "@akasha/code-system/module"

export const quietPrint = {
  id: "01a060f1-6939-7e66-bda8-537dbe53d04e",
  pageTypeSlug: "module",
  slug: "quiet-print",
  definition: "printing one line to chat before chat is ready",
  code: "ts",
} as const satisfies Module
