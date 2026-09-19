import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const iCutTheWorldUnseen = {
  id: "01a06575-981b-7996-ba64-19f4d7574a87",
  type: "page-type/world-skill",
  slug: "i-cut-the-world-unseen",
  title: "I Cut the World Unseen",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
