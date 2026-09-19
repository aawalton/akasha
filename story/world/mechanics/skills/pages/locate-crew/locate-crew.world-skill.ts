import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const locateCrew = {
  id: "01a0657d-0240-7dfe-b6b5-09484708e8a4",
  type: "page-type/world-skill",
  slug: "locate-crew",
  title: "Locate Crew",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
