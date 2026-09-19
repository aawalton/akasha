import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const deathBolt = {
  id: "01a06572-95bb-7fbd-9661-ad389262aec7",
  type: "page-type/world-spell",
  slug: "death-bolt",
  title: "Death Bolt",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
