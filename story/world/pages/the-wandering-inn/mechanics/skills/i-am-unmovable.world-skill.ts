import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const iAmUnmovable = {
  id: "01a06575-981b-7f7e-869a-44ae2babe5dc",
  type: "page-type/world-skill",
  slug: "i-am-unmovable",
  title: "I Am Unmovable",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
