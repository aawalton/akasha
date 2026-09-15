import type { WorldSpell } from "akasha/story/world-mechanic/world-spell/world-spell.page-type.types.ts"

export const earthenRampart = {
  id: "01a06572-95be-7121-831e-d56fd1e5d86a",
  type: "world-spell",
  slug: "earthen-rampart",
  title: "Earthen Rampart",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
