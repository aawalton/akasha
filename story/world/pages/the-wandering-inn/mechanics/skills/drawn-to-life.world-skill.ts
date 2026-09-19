import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const drawnToLife = {
  id: "01a06575-9805-7cbb-a532-88ac548fabbe",
  type: "page-type/world-skill",
  slug: "drawn-to-life",
  title: "Drawn to Life",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
