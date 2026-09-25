import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const seatDefaults = {
  id: "01a0695a-d2ea-7b18-bd0c-bdd9d9ef7cbe",
  type: "page-type/module",
  slug: "seat-defaults",
  definition: "how code writes the value each attribute of a seat has where no value is chosen",
  code: "ts",
} as const satisfies Module
