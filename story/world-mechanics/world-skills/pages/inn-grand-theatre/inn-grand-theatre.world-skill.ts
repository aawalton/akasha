import type { WorldSkill } from "../../world-skill.page-type.ts"

export const innGrandTheatre = {
  id: "01a06575-981f-7e56-92e5-5ac6ba6d7b2e",
  pageTypeSlug: "world-skill",
  slug: "inn-grand-theatre",
  title: "Inn: Grand Theatre",
  worldSlug: "the-wandering-inn",
  evolvesToSlugs: ["inn-the-world-s-eye-theatre"],
  references: "jsonl",
} as const satisfies WorldSkill
