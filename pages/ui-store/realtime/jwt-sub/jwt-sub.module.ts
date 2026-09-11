import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const jwtSub = {
  id: "01a05b69-4555-7824-9432-7eb9b786def0",
  type: "module",
  slug: "jwt-sub",
  definition: "the subject a token names",
  code: "ts",
} as const satisfies Module
