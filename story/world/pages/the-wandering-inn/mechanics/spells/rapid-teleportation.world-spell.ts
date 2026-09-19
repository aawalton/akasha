import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const rapidTeleportation = {
  id: "01a06572-95dc-7f6f-9f84-91bebcbb29be",
  type: "page-type/world-spell",
  slug: "rapid-teleportation",
  title: "Rapid Teleportation",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
