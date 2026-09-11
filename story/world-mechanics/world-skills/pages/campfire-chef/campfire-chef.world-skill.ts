import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const campfireChef = {
  id: "01a06575-97fa-77ef-9e5b-3f52b33d8add",
  type: "world-skill",
  slug: "campfire-chef",
  title: "Campfire Chef",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
