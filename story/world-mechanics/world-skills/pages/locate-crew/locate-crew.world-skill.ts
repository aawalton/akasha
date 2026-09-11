import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const locateCrew = {
  id: "01a0657d-0240-7dfe-b6b5-09484708e8a4",
  type: "world-skill",
  slug: "locate-crew",
  title: "Locate Crew",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
