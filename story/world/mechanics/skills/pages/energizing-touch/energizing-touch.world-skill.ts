import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const energizingTouch = {
  id: "01a06575-9808-72b6-bdf6-c7c356330d3d",
  type: "page-type/world-skill",
  slug: "energizing-touch",
  title: "Energizing Touch",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
