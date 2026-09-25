import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const seatByName = {
  id: "01a0695a-d2ea-7260-bb7b-69f25e7d1c58",
  type: "page-type/module",
  slug: "seat-by-name",
  definition:
    "how code finds the id of a seat from its name and whether a process runs in the seat",
  code: "ts",
} as const satisfies Module
