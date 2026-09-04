import type { Module } from "@akasha/code-system/module"

export const seatDefaults = {
  id: "01a0695a-d2ea-7b18-bd0c-bdd9d9ef7cbe",
  pageTypeSlug: "module",
  slug: "seat-defaults",
  definition: "the default slug for each attribute slot of a root, one slot=slug line each",
  code: "ts",
} as const satisfies Module
