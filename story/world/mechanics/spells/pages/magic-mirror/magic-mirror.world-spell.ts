import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const magicMirror = {
  id: "01a06572-95d1-7d87-a0d2-5b23a8425945",
  type: "page-type/world-spell",
  slug: "magic-mirror",
  title: "Magic Mirror",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
