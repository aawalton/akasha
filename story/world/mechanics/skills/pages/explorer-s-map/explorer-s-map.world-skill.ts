import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const explorerSMap = {
  id: "01a06575-980a-7287-8840-e59427b20539",
  type: "page-type/world-skill",
  slug: "explorer-s-map",
  title: "Explorer’s Map",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
