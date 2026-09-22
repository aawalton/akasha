import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionEquipmentCatalog = {
  id: "01a0604d-239c-7cb2-bd21-e3efe7e74eca",
  type: "page-type/module",
  slug: "companion-equipment-catalog",
  definition: "the game's trait, quality, armor and weapon numbers for companion gear",
  code: "ts",
} as const satisfies Module
