import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const swordFightingBasic = {
  id: "01a0657d-0307-7af0-8d3a-8655bb93ffb9",
  type: "page-type/world-skill",
  slug: "sword-fighting-basic",
  title: "Sword Fighting – Basic",
  world: "world/the-wandering-inn",
  evolvesToSlugs: ["world-skill/sword-fighting-expert"],
  createdAt: "2026-09-03T04:18:06.727Z",
  updatedAt: "2026-09-22T18:28:27.000Z",
} as const satisfies WorldSkill
