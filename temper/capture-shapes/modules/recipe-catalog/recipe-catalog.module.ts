import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const recipeCatalog = {
  id: "01a0604d-23a0-7cb1-93da-f155d5f49f5b",
  type: "module",
  slug: "recipe-catalog",
  definition: "the recipes the game lists, held under recipe lists",
  code: "ts",
} as const satisfies Module
