import type { Module } from "@akasha/code-system/module"

export const builtinNumber = {
  id: "01a06758-8ece-7000-91d7-80cda0f0d394",
  pageTypeSlug: "module",
  slug: "builtin-number",
  definition: "the Lua a Number built-in becomes",
  code: "ts",
} as const satisfies Module
