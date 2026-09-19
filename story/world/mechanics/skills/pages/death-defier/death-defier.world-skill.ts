import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const deathDefier = {
  id: "01a06575-9802-7930-b61a-f69a5cb2262b",
  type: "page-type/world-skill",
  slug: "death-defier",
  title: "Death Defier",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
