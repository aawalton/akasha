import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const iBreatheInAir = {
  id: "01a06575-981b-7008-bbcd-9adf095b4bb7",
  type: "page-type/world-skill",
  slug: "i-breathe-in-air",
  title: "I Breathe in Air",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
