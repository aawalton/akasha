import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const isItADeal = {
  id: "01a06575-9820-70b9-a927-b256ad4f4c06",
  type: "page-type/world-skill",
  slug: "is-it-a-deal",
  title: "Is It A Deal",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
