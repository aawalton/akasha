import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const seatRoster = {
  id: "01a06983-278f-79c3-8bd9-13992cd15e2c",
  type: "module",
  slug: "seat-roster",
  definition: "the seats there are, with the name, domain, role and presence of each",
  code: "ts",
} as const satisfies Module
