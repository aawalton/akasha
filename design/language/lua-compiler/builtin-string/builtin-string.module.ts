import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const builtinString = {
  id: "01a06758-8ecf-7000-9de2-25def54eadf9",
  type: "module",
  slug: "builtin-string",
  definition: "the Lua a String built-in becomes",
  code: "ts",
} as const satisfies Module
