import type { WorldSkill } from "../world-skill.page-type.ts"

export const tenFootStrike = {
  id: "01a0657d-0311-79e5-926d-6819e04bb814",
  pageTypeSlug: "world-skill",
  slug: "ten-foot-strike",
  title: "Ten-foot Strike",
  worldSlug: "the-wandering-inn",
  evolvesToSlugs: ["twenty-foot-strike"],
} as const satisfies WorldSkill
