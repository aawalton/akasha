import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const focusedFire = {
  id: "01a06575-980f-763e-b1cd-d055db7d5b4f",
  type: "page-type/world-skill",
  slug: "focused-fire",
  title: "Focused Fire",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
