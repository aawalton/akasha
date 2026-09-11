import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const potionsCraftedMagicka = {
  id: "01a06076-1b6a-77c3-b74e-f6c3d3a84855",
  type: "module",
  slug: "potions-crafted-magicka",
  definition: "the crafted essences serving a character's magicka",
  code: "ts",
} as const satisfies Module
