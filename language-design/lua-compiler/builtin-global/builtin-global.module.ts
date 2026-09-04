import type { Module } from "@akasha/code-system/module"

export const builtinGlobal = {
  id: "01a06758-8ecb-7001-8408-31d70b193407",
  pageTypeSlug: "module",
  slug: "builtin-global",
  definition: "the Lua a global built-in call such as parseInt or setTimeout becomes",
  code: "ts",
} as const satisfies Module
