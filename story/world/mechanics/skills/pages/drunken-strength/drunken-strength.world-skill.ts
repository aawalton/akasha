import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const drunkenStrength = {
  id: "01a06575-9806-7320-9185-a43d3c05207e",
  type: "page-type/world-skill",
  slug: "drunken-strength",
  title: "Drunken Strength",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
