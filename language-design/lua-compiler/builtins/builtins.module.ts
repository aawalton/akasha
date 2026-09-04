import type { Module } from "@akasha/code-system/module"

export const builtins = {
  id: "01a06758-8ecc-7000-bd44-b5897884195d",
  pageTypeSlug: "module",
  slug: "builtins",
  definition: "the dispatch from a built-in's owner type to the Lua form of the call",
  code: "ts",
} as const satisfies Module
