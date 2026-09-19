import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const innGrandTheatre = {
  id: "01a06575-981f-7e56-92e5-5ac6ba6d7b2e",
  type: "page-type/world-skill",
  slug: "inn-grand-theatre",
  title: "Inn: Grand Theatre",
  world: "world/the-wandering-inn",
  evolvesToSlugs: ["inn-the-world-s-eye-theatre"],
  references: "jsonl",
} as const satisfies WorldSkill
