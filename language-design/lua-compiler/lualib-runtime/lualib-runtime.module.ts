import type { Module } from "@akasha/code/module"

export const lualibRuntime = {
  id: "01a06758-8e5f-7000-91ee-714a2cfab1a4",
  pageTypeSlug: "module",
  type: "module",
  slug: "lualib-runtime",
  definition: "lualib features resolved to the Lua code or require statements a file needs",
  code: "ts",
} as const satisfies Module
