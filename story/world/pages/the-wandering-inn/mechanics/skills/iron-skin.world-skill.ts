import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const ironSkin = {
  id: "01a06575-9820-7a8a-868c-c2fb353369c4",
  type: "page-type/world-skill",
  slug: "iron-skin",
  title: "Iron Skin",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
