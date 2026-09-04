import type { WorldSkill } from "../../world-skill.page-type.ts"

export const innTheWorldSEyeTheatre = {
  id: "01a06575-981f-72d8-a787-a5d3571b9ee0",
  pageTypeSlug: "world-skill",
  slug: "inn-the-world-s-eye-theatre",
  title: "Inn: The World’s Eye Theatre",
  worldSlug: "the-wandering-inn",
  evolvesFromSlugs: ["inn-grand-theatre"],
  references: "jsonl",
} as const satisfies WorldSkill
