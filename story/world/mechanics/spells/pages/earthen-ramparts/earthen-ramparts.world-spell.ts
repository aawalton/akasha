import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const earthenRamparts = {
  id: "01a06572-95be-7753-a0f5-2bf5400b3da5",
  type: "page-type/world-spell",
  slug: "earthen-ramparts",
  title: "Earthen Ramparts",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
