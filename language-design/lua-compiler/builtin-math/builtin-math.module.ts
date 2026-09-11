import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const builtinMath = {
  id: "01a06758-8ecd-7000-8612-3b40cf193206",
  type: "module",
  slug: "builtin-math",
  definition: "the Lua a Math built-in becomes",
  code: "ts",
} as const satisfies Module
