import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const decapitationSlice = {
  id: "01a06575-9802-7113-9257-9819db136a1a",
  type: "page-type/world-skill",
  slug: "decapitation-slice",
  title: "Decapitation Slice",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
