import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const accountTerminal = {
  id: "01a069bf-f8d9-7000-aa5b-257908ffc88e",
  type: "page-type/module",
  slug: "account-terminal",
  definition:
    "the registration accounts with a credential failure a process keeps until someone signs in",
  code: "ts",
} as const satisfies Module
