import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const rapidTeleport = {
  id: "01a06572-95dc-790b-9cb3-82683872a2ca",
  type: "page-type/world-spell",
  slug: "rapid-teleport",
  title: "Rapid Teleport",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
