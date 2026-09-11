import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const instantaneousReload = {
  id: "01a06575-981f-7fbc-b86f-99be65b11978",
  type: "world-skill",
  slug: "instantaneous-reload",
  title: "Instantaneous Reload",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
