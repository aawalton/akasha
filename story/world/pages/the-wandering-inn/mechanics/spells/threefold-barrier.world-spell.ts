import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const threefoldBarrier = {
  id: "01a06572-95e6-7c19-b833-c8d4cd84ac8d",
  type: "page-type/world-spell",
  slug: "threefold-barrier",
  title: "Threefold Barrier",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.430Z",
  updatedAt: "2026-09-22T13:35:05.000Z",
} as const satisfies WorldSpell
