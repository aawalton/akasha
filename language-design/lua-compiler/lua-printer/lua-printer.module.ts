import type { Module } from "@akasha/code/module"

export const luaPrinter = {
  id: "01a06758-8e5b-7000-abc1-dcc410a21334",
  pageTypeSlug: "module",
  type: "module",
  slug: "lua-printer",
  definition: "a Lua file printed to code with its source map",
  code: "ts",
} as const satisfies Module
