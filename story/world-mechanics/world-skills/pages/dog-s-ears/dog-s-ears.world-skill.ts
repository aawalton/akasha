import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const dogSEars = {
  id: "01a06575-9804-77eb-b70f-20839ceb2483",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "dog-s-ears",
  title: "Dog’s Ears",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
