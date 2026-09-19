import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const houndSScentEdibles = {
  id: "01a06575-981a-7e1f-ab36-64abaad2b4da",
  type: "page-type/world-skill",
  slug: "hound-s-scent-edibles",
  title: "Hound’s Scent (Edibles)",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
