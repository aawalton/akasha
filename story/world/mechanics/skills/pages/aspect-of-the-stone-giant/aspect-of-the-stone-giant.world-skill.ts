import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const aspectOfTheStoneGiant = {
  id: "01a06575-97ee-7391-9308-c697f5cfcb30",
  type: "page-type/world-skill",
  slug: "aspect-of-the-stone-giant",
  title: "Aspect of the Stone Giant",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
