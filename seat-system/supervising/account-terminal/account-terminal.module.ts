import type { Module } from "@akasha/code-system/module"

export const accountTerminal = {
  id: "01a069bf-f8d9-7000-aa5b-257908ffc88e",
  pageTypeSlug: "module",
  slug: "account-terminal",
  definition:
    "the accounts whose credentials failed past recovery, remembered for the life of the process",
  code: "ts",
} as const satisfies Module
