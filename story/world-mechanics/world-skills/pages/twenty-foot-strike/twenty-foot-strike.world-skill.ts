import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const twentyFootStrike = {
  id: "01a0657d-0317-7669-b81b-2c35e1c082e3",
  type: "world-skill",
  slug: "twenty-foot-strike",
  title: "Twenty-foot Strike",
  world: "the-wandering-inn",
  evolvesFromSlugs: ["ten-foot-strike"],
} as const satisfies WorldSkill
