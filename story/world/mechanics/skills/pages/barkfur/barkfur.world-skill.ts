import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const barkfur = {
  id: "01a06575-97f3-7b92-ba08-38bacbee0c89",
  type: "page-type/world-skill",
  slug: "barkfur",
  title: "Barkfur",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
