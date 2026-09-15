import type { WorldSkill } from "akasha/story/world-mechanic/world-skill/world-skill.page-type.types.ts"

export const iSeeYou = {
  id: "01a06575-981c-7a3e-8622-47a28d764528",
  type: "world-skill",
  slug: "i-see-you",
  title: "I See You",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
