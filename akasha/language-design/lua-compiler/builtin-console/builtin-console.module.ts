import type { Module } from "@akasha/code-system/module"

export const builtinConsole = {
  id: "01a06758-8eca-7001-a45d-f12af3293438",
  pageTypeSlug: "module",
  slug: "builtin-console",
  definition: "the Lua a console method call becomes",
  code: "ts",
} as const satisfies Module
