import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const hourOfTheSecretary = {
  id: "01a06575-981a-7ff0-a006-dab7c9b6b234",
  type: "page-type/world-skill",
  slug: "hour-of-the-secretary",
  title: "Hour of the Secretary",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
