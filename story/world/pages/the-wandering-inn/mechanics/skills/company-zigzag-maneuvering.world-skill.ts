import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const companyZigzagManeuvering = {
  id: "01a06575-97fc-7281-b6e5-f3f45e275fc5",
  type: "page-type/world-skill",
  slug: "company-zigzag-maneuvering",
  title: "Company: Zigzag Maneuvering",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
