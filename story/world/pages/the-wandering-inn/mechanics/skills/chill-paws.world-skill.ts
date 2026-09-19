import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const chillPaws = {
  id: "01a06575-97fb-79e7-b9d1-332153475165",
  type: "page-type/world-skill",
  slug: "chill-paws",
  title: "Chill Paws",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
