import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const artbookSavedSketch = {
  id: "01a06575-97ed-76eb-8196-419f74857474",
  type: "page-type/world-skill",
  slug: "artbook-saved-sketch",
  title: "Artbook: Saved Sketch",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
