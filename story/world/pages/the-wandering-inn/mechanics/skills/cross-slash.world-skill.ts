import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const crossSlash = {
  id: "01a06575-97ff-7936-962c-9cf79342eb7f",
  type: "page-type/world-skill",
  slug: "cross-slash",
  title: "Cross Slash",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
