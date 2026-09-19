import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const deathBeforeDishonor = {
  id: "01a06575-9802-72a5-b509-dff34750e3c5",
  type: "page-type/world-skill",
  slug: "death-before-dishonor",
  title: "Death Before Dishonor",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
