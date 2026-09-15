import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const builtinGlobal = {
  id: "01a06758-8ecb-7001-8408-31d70b193407",
  type: "page-type/module",
  slug: "builtin-global",
  definition: "the Lua a global built-in call such as parseInt or setTimeout becomes",
  code: "ts",
} as const satisfies Module
