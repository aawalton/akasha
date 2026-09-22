import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const seatDefaults = {
  id: "01a0695a-d2ea-7b18-bd0c-bdd9d9ef7cbe",
  type: "page-type/module",
  slug: "seat-defaults",
  definition: "the default slug for each attribute slot of a root, a slot=slug line each",
  code: "ts",
} as const satisfies Module
