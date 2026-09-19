import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const furOfTheFortress = {
  id: "01a06575-9811-7872-9c54-a9b130132d74",
  type: "page-type/world-skill",
  slug: "fur-of-the-fortress",
  title: "Fur of the Fortress",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
