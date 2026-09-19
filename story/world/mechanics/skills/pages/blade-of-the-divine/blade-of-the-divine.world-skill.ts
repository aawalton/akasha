import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const bladeOfTheDivine = {
  id: "01a06575-97f5-789f-93a9-f739fee23411",
  type: "page-type/world-skill",
  slug: "blade-of-the-divine",
  title: "Blade of the Divine",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
