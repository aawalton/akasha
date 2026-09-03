import type { Module } from "@akasha/code-system/module"

export const tstlLualibRuntime = {
  id: "01a06758-8e5f-7000-91ee-714a2cfab1a4",
  pageTypeSlug: "module",
  slug: "tstl-lualib-runtime",
  definition: "lualib features resolved to the Lua code or require statements a file needs",
  code: "ts",
} as const satisfies Module
