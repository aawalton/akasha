import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const twentyFootStrike = {
  id: "01a0657d-0317-7669-b81b-2c35e1c082e3",
  type: "page-type/world-skill",
  slug: "twenty-foot-strike",
  title: "Twenty-foot Strike",
  world: "world/the-wandering-inn",
  evolvesFromSlugs: ["world-skill/ten-foot-strike"],
  createdAt: "2026-09-03T04:18:06.743Z",
  updatedAt: "2026-09-22T18:27:39.000Z",
} as const satisfies WorldSkill
