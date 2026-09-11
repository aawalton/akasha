import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const lesserTeleport = {
  id: "01a06572-95cd-7e97-92bf-3f0b3736c7c3",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "lesser-teleport",
  title: "Lesser Teleport",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
