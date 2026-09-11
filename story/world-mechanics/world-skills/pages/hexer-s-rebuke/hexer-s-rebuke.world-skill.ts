import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const hexerSRebuke = {
  id: "01a06575-9819-7f5d-af89-ae474a186d03",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "hexer-s-rebuke",
  title: "Hexer’s Rebuke",
  world: "the-wandering-inn",
  evolvesFromSlugs: ["dizzying-rebuke"],
} as const satisfies WorldSkill
