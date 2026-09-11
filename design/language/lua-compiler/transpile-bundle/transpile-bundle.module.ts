import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const transpileBundle = {
  id: "01a06758-8ed0-7000-89a6-e832620f4a63",
  type: "module",
  slug: "transpile-bundle",
  definition: "the single Lua file with every module table and the require override",
  code: "ts",
} as const satisfies Module
