import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const quietPrint = {
  id: "01a060f1-6939-7e66-bda8-537dbe53d04e",
  type: "page-type/module",
  slug: "quiet-print",
  definition: "printing a line to chat before chat is ready",
  code: "ts",
} as const satisfies Module
