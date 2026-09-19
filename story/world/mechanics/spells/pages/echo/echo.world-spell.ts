import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const echo = {
  id: "01a06572-95bf-7b4f-b714-37959d520cac",
  type: "page-type/world-spell",
  slug: "echo",
  title: "Echo",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
