import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const swordFightingExpert = {
  id: "01a0657d-0307-7d6a-a376-39c62d52ad9d",
  type: "page-type/world-skill",
  slug: "sword-fighting-expert",
  title: "Sword Fighting – Expert",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  evolvesFromSlugs: ["world-skill/sword-fighting-basic"],
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.727Z",
  updatedAt: "2026-09-22T18:27:39.000Z",
} as const satisfies WorldSkill
