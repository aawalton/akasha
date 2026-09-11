import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const potionsCraftedStamina = {
  id: "01a06076-1b6b-7545-8c80-5c7de0394271",
  pageTypeSlug: "module",
  type: "module",
  slug: "potions-crafted-stamina",
  definition: "the crafted essences serving a character's stamina",
  code: "ts",
} as const satisfies Module
