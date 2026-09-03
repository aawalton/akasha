import type { Module } from "@akasha/code-system/module"

export const seatByName = {
  id: "01a0695a-d2ea-7260-bb7b-69f25e7d1c58",
  pageTypeSlug: "module",
  slug: "seat-by-name",
  definition:
    "the seat a name reaches in akasha, with the id it has and whether a process is in it",
  code: "ts",
} as const satisfies Module
