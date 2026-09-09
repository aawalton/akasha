import type { WorldSpell } from "../../world-spell.page-type.ts"

export const greaterInvisibility = {
  id: "01a06572-95c7-7a22-99aa-d766e73fda2d",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "greater-invisibility",
  title: "Greater Invisibility",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
