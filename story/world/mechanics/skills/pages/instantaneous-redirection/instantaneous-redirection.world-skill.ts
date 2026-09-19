import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const instantaneousRedirection = {
  id: "01a06575-981f-7efe-a50a-514cc7f10d43",
  type: "page-type/world-skill",
  slug: "instantaneous-redirection",
  title: "Instantaneous Redirection",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
