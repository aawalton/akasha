import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const basicProficiencySpeech = {
  id: "01a06575-97f4-766a-aba7-4af4de2a7d86",
  type: "page-type/world-skill",
  slug: "basic-proficiency-speech",
  title: "Basic Proficiency: Speech",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
