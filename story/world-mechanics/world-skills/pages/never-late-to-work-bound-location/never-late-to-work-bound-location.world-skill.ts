import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const neverLateToWorkBoundLocation = {
  id: "01a0657d-027b-712e-af12-f44c0456f316",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "never-late-to-work-bound-location",
  title: "Never Late To Work (Bound Location)",
  world: "the-wandering-inn",
  evolvesToSlugs: ["where-i-m-needed-i-am-6-locations"],
} as const satisfies WorldSkill
