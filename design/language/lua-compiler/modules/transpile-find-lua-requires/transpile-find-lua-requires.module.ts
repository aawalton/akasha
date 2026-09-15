import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const transpileFindLuaRequires = {
  id: "01a06758-8ed1-7001-903b-f57b5d79f469",
  type: "page-type/module",
  slug: "transpile-find-lua-requires",
  definition: "the positions and paths of every require call in a Lua source text",
  code: "ts",
} as const satisfies Module
