import type { Module } from "@akasha/code-system/module"

export const transpileFindLuaRequires = {
  id: "01a06758-8ed1-7001-903b-f57b5d79f469",
  pageTypeSlug: "module",
  slug: "transpile-find-lua-requires",
  definition: "the positions and paths of every require call in a Lua source text",
  code: "ts",
} as const satisfies Module
