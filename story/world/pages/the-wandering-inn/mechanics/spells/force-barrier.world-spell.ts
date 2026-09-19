import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const forceBarrier = {
  id: "01a06572-95c4-7bbd-8dea-4eac44b5f80f",
  type: "page-type/world-spell",
  slug: "force-barrier",
  title: "Force Barrier",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
