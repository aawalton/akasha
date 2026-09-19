import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const spiderSGrip = {
  id: "01a06572-95e2-7471-8956-64764b1a0019",
  type: "page-type/world-spell",
  slug: "spider-s-grip",
  title: "Spider’s Grip",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
