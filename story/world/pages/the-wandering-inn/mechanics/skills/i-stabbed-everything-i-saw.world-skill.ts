import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const iStabbedEverythingISaw = {
  id: "01a06575-981c-7a28-99ea-24f6b5ef059e",
  type: "page-type/world-skill",
  slug: "i-stabbed-everything-i-saw",
  title: "I Stabbed Everything I Saw",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
