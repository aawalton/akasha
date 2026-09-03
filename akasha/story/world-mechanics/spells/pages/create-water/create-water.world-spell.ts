import type { WorldSpell } from "../../world-spell.page-type.ts"

export const createWater = {
  id: "01a06572-95bb-7682-9da8-c0133790e35f",
  pageTypeSlug: "world-spell",
  slug: "create-water",
  title: "Create Water",
  worldSlug: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
