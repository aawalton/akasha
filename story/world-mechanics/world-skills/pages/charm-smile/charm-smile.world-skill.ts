import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const charmSmile = {
  id: "01a06575-97fa-7ad5-bc00-1ec0fe8c33ec",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "charm-smile",
  title: "Charm Smile",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
