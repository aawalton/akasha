import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const navigationEntry = {
  id: "01a06269-2895-73f7-87ec-a25d1ab915ec",
  type: "page-type/module",
  slug: "navigation-entry",
  definition: "where the transpiler starts this add-on's one Lua file",
  code: "ts",
} as const satisfies Module
