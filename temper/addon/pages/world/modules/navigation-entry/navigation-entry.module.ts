import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const navigationEntry = {
  id: "01a06269-2895-73f7-87ec-a25d1ab915ec",
  type: "page-type/module",
  slug: "navigation-entry",
  definition: "the modules the navigation feature runs as the bundle loads",
  code: "ts",
} as const satisfies Module
