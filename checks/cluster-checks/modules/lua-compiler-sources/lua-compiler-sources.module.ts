import type { Module } from "@akasha/code/module"

export const luaCompilerSources = {
  id: "01a08107-8080-7083-8032-4280ca490933",
  pageTypeSlug: "module",
  slug: "lua-compiler-sources",
  definition: "the TypeScript files a tsconfig hands to the Lua compiler",
  code: "ts",
} as const satisfies Module
