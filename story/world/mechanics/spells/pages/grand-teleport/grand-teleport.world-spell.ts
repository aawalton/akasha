import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const grandTeleport = {
  id: "01a06572-95c6-7891-9972-36bcafa19ba6",
  type: "page-type/world-spell",
  slug: "grand-teleport",
  title: "Grand Teleport",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
