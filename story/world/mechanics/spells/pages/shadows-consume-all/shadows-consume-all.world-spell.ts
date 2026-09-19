import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const shadowsConsumeAll = {
  id: "01a06572-95df-766d-a512-41d5913f09ac",
  type: "page-type/world-spell",
  slug: "shadows-consume-all",
  title: "Shadows Consume All",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
