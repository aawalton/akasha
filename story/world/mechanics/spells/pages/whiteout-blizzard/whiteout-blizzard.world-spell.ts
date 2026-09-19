import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const whiteoutBlizzard = {
  id: "01a06572-95ea-7151-8875-4663188ab605",
  type: "page-type/world-spell",
  slug: "whiteout-blizzard",
  title: "Whiteout Blizzard",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
