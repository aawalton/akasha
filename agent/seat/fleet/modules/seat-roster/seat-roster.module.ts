import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const seatRoster = {
  id: "01a06983-278f-79c3-8bd9-13992cd15e2c",
  type: "page-type/module",
  slug: "seat-roster",
  definition: "how code reads every seat with its name and its attributes",
  code: "ts",
} as const satisfies Module
