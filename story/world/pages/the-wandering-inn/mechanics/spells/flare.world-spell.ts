import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const flare = {
  id: "01a06572-95c3-76c2-b565-9a3db2901910",
  type: "page-type/world-spell",
  slug: "flare",
  title: "Flare",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
