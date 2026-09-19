import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const threefoldBarrier = {
  id: "01a06572-95e6-7c19-b833-c8d4cd84ac8d",
  type: "page-type/world-spell",
  slug: "threefold-barrier",
  title: "Threefold Barrier",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
