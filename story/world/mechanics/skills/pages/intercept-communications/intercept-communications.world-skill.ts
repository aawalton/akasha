import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const interceptCommunications = {
  id: "01a06575-9820-7d9e-bfe9-8e21a0d8401f",
  type: "page-type/world-skill",
  slug: "intercept-communications",
  title: "Intercept Communications",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
