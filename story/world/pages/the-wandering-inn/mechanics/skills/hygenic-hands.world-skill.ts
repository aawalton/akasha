import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const hygenicHands = {
  id: "01a06575-981b-7fcb-a220-bc191bf66e13",
  type: "page-type/world-skill",
  slug: "hygenic-hands",
  title: "Hygenic Hands",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
