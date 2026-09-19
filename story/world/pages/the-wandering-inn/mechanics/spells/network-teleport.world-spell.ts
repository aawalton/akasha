import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const networkTeleport = {
  id: "01a06572-95d9-7f91-ae97-a6881d03b3a8",
  type: "page-type/world-spell",
  slug: "network-teleport",
  title: "Network Teleport",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
