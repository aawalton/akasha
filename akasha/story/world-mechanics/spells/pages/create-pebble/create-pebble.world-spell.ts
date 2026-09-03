import type { WorldSpell } from "../../world-spell.page-type.ts"

export const createPebble = {
  id: "01a06572-95bb-78a7-ba7e-b9e3e4e01627",
  pageTypeSlug: "world-spell",
  slug: "create-pebble",
  title: "Create: Pebble",
  worldSlug: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
