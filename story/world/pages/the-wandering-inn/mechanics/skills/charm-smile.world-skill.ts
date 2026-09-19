import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const charmSmile = {
  id: "01a06575-97fa-7ad5-bc00-1ec0fe8c33ec",
  type: "page-type/world-skill",
  slug: "charm-smile",
  title: "Charm Smile",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
