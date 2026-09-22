import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const transpileEmitFile = {
  id: "01a06758-8ed0-7002-9373-af4ed6123e75",
  type: "page-type/module",
  slug: "transpile-emit-file",
  definition: "the record of a printed Lua file: its code, source map, and output path",
  code: "ts",
} as const satisfies Module
