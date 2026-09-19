import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const appraise = {
  id: "01a06575-97ec-716b-ab3d-212c4c4623f2",
  type: "page-type/world-skill",
  slug: "appraise",
  title: "Appraise",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
