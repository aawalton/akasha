import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const aspectOfTheChampion = {
  id: "01a06575-97ee-7cf2-a464-b45d6a5cbe6f",
  type: "page-type/world-skill",
  slug: "aspect-of-the-champion",
  title: "Aspect of the Champion",
  world: "world/the-wandering-inn",
  evolvesToSlugs: ["supreme-aspect-of-the-champion"],
  references: "jsonl",
} as const satisfies WorldSkill
