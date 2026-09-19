import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const farcastStoneskin = {
  id: "01a06572-95c0-71c2-b5cc-42de1f4ab6c3",
  type: "page-type/world-spell",
  slug: "farcast-stoneskin",
  title: "Farcast: Stoneskin",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
