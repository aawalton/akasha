import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const elegantSave = {
  id: "01a06575-9807-7f0f-bcbc-29c9478098cd",
  type: "page-type/world-skill",
  slug: "elegant-save",
  title: "Elegant Save",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
