import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const persistence = {
  id: "01a05b69-4544-78d7-8a8e-945b6447e4d6",
  type: "module",
  slug: "persistence",
  definition: "the snapshot of the page rows kept between sessions",
  code: "ts",
} as const satisfies Module
