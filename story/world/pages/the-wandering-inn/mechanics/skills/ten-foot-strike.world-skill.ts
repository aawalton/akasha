import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const tenFootStrike = {
  id: "01a0657d-0311-79e5-926d-6819e04bb814",
  type: "page-type/world-skill",
  slug: "ten-foot-strike",
  title: "Ten-foot Strike",
  world: "world/the-wandering-inn",
  evolvesToSlugs: ["world-skill/twenty-foot-strike"],
  createdAt: "2026-09-03T04:18:06.737Z",
  updatedAt: "2026-09-22T18:28:27.000Z",
} as const satisfies WorldSkill
