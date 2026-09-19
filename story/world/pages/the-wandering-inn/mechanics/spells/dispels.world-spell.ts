import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const dispels = {
  id: "01a06572-95be-7323-9d5b-96f09e618054",
  type: "page-type/world-spell",
  slug: "dispels",
  title: "Dispels",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
