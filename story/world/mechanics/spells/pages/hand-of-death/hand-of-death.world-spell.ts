import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const handOfDeath = {
  id: "01a06572-95c8-73d6-9686-d987e6203b8e",
  type: "page-type/world-spell",
  slug: "hand-of-death",
  title: "Hand of Death",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
