import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const innTheWorldSEyeTheatre = {
  id: "01a06575-981f-72d8-a787-a5d3571b9ee0",
  type: "page-type/world-skill",
  slug: "inn-the-world-s-eye-theatre",
  title: "Inn: The World’s Eye Theatre",
  world: "world/the-wandering-inn",
  evolvesFromSlugs: ["inn-grand-theatre"],
  references: "jsonl",
} as const satisfies WorldSkill
