import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const cleansedMaterials = {
  id: "01a06575-97fb-70f9-b1c6-4e804cb78972",
  type: "page-type/world-skill",
  slug: "cleansed-materials",
  title: "Cleansed Materials",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
