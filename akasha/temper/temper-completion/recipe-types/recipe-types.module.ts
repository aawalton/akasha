import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const recipeTypes = {
  id: "01a060c0-413d-7537-82ea-804fc0d82174",
  pageTypeSlug: "module",
  slug: "recipe-types",
  definition: "the shape of a crafting recipe list and a recipe inside it",
  code: "ts",
} as const satisfies Module
