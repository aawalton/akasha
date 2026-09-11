import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const shadowsConsumeAll = {
  id: "01a06572-95df-766d-a512-41d5913f09ac",
  type: "world-spell",
  slug: "shadows-consume-all",
  title: "Shadows Consume All",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
