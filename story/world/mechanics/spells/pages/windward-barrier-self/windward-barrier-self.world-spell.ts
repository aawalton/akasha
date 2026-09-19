import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const windwardBarrierSelf = {
  id: "01a06572-95ea-7f92-944b-372754789a1f",
  type: "page-type/world-spell",
  slug: "windward-barrier-self",
  title: "Windward Barrier: Self",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
