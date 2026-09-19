import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const earthenBulwark = {
  id: "01a06572-95be-7a05-9990-f609db2dc1bf",
  type: "page-type/world-spell",
  slug: "earthen-bulwark",
  title: "Earthen Bulwark",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
