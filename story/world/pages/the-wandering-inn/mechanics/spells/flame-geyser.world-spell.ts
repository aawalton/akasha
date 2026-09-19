import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const flameGeyser = {
  id: "01a06572-95c3-7bdc-b787-ae0d59b8f7c6",
  type: "page-type/world-spell",
  slug: "flame-geyser",
  title: "Flame Geyser",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
