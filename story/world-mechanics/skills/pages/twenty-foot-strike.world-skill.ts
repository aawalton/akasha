import type { WorldSkill } from "../world-skill.page-type.ts"

export const twentyFootStrike = {
  id: "01a0657d-0317-7669-b81b-2c35e1c082e3",
  pageTypeSlug: "world-skill",
  slug: "twenty-foot-strike",
  title: "Twenty-foot Strike",
  worldSlug: "the-wandering-inn",
  evolvesFromSlugs: ["ten-foot-strike"],
} as const satisfies WorldSkill
