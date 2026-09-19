import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const hollowPointShot = {
  id: "01a06575-981a-739b-b4b1-9044fd46f188",
  type: "page-type/world-skill",
  slug: "hollow-point-shot",
  title: "Hollow-Point Shot",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
