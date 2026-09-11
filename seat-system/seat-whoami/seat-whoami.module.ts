import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const seatWhoami = {
  id: "01a06983-278f-7cc2-a3c2-55ba84031a4e",
  type: "module",
  slug: "seat-whoami",
  definition: "the identity a seat answers about itself",
  code: "ts",
} as const satisfies Module
