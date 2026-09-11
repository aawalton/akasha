import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const fireBolt = {
  id: "01a06572-95c0-764c-b1b1-341874792c5f",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "fire-bolt",
  title: "Fire Bolt",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
