import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const iceflesh = {
  id: "01a06572-95ca-7223-bf51-a8b994b8f0bb",
  type: "page-type/world-spell",
  slug: "iceflesh",
  title: "Iceflesh",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
