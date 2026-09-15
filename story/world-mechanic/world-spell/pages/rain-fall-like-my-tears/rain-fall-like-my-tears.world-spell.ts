import type { WorldSpell } from "akasha/story/world-mechanic/world-spell/world-spell.page-type.types.ts"

export const rainFallLikeMyTears = {
  id: "01a06572-95db-76dd-81f3-c687785692c1",
  type: "world-spell",
  slug: "rain-fall-like-my-tears",
  title: "Rain, Fall Like My Tears",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
