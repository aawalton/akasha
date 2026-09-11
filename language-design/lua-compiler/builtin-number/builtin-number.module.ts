import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const builtinNumber = {
  id: "01a06758-8ece-7000-91d7-80cda0f0d394",
  type: "module",
  slug: "builtin-number",
  definition: "the Lua a Number built-in becomes",
  code: "ts",
} as const satisfies Module
