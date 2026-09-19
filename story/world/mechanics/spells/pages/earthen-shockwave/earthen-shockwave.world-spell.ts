import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const earthenShockwave = {
  id: "01a06572-95be-73dd-a477-e9d2f6bbd508",
  type: "page-type/world-spell",
  slug: "earthen-shockwave",
  title: "Earthen Shockwave",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
