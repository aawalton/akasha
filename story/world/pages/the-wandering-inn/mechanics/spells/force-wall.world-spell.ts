import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const forceWall = {
  id: "01a06572-95c5-74ff-9fae-efba9cf4fa43",
  type: "page-type/world-spell",
  slug: "force-wall",
  title: "Force Wall",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
