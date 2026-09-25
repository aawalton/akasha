import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const seatWhoami = {
  id: "01a06983-278f-7cc2-a3c2-55ba84031a4e",
  type: "page-type/module",
  slug: "seat-whoami",
  definition: "how code finds the name and the attributes of a seat",
  code: "ts",
} as const satisfies Module
