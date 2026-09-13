import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const transpileOutputCollector = {
  id: "01a06758-8ed3-7000-9776-842830b4ff4a",
  type: "module",
  slug: "transpile-output-collector",
  definition:
    "the emitted Lua, source map, and declaration text collected in memory per source file",
  code: "ts",
} as const satisfies Module
