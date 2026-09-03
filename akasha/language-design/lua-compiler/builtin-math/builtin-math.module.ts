import type { Module } from "@akasha/code-system/module"

export const builtinMath = {
  id: "01a06758-8ecd-7000-8612-3b40cf193206",
  pageTypeSlug: "module",
  slug: "builtin-math",
  definition: "the Lua a Math built-in becomes",
  code: "ts",
} as const satisfies Module
