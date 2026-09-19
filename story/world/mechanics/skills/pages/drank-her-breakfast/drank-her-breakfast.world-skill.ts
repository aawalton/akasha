import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const drankHerBreakfast = {
  id: "01a06575-9805-798a-b969-f3e0fbf81f61",
  type: "page-type/world-skill",
  slug: "drank-her-breakfast",
  title: "Drank Her Breakfast",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
