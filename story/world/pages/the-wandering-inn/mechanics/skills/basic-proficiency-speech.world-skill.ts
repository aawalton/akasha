import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const basicProficiencySpeech = {
  id: "01a06575-97f4-766a-aba7-4af4de2a7d86",
  type: "page-type/world-skill",
  slug: "basic-proficiency-speech",
  title: "Basic Proficiency: Speech",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.564Z",
  updatedAt: "2026-09-22T13:31:40.000Z",
} as const satisfies WorldSkill
