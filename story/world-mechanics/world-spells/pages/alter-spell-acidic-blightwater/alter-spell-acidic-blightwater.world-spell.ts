import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const alterSpellAcidicBlightwater = {
  id: "01a06572-95b3-7a62-a9e1-440eabcf2204",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "alter-spell-acidic-blightwater",
  title: "Alter Spell: Acidic Blightwater",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
