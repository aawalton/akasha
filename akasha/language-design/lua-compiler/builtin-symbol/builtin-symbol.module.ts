import type { Module } from "@akasha/code-system/module"

export const builtinSymbol = {
  id: "01a06758-8ecf-7001-8cab-6976114d7b0b",
  pageTypeSlug: "module",
  slug: "builtin-symbol",
  definition: "the Lua a Symbol.for or Symbol.keyFor call becomes",
  code: "ts",
} as const satisfies Module
