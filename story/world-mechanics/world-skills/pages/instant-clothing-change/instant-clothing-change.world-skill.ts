import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const instantClothingChange = {
  id: "01a06575-981f-7c89-bfd9-9a2104dd5066",
  type: "world-skill",
  slug: "instant-clothing-change",
  title: "Instant Clothing Change",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
