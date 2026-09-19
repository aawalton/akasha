import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const earthenFloor = {
  id: "01a06572-95be-7972-b40b-b4403690029a",
  type: "page-type/world-spell",
  slug: "earthen-floor",
  title: "Earthen Floor",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
