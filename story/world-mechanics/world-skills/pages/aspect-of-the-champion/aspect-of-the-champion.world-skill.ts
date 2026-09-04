import type { WorldSkill } from "../../world-skill.page-type.ts"

export const aspectOfTheChampion = {
  id: "01a06575-97ee-7cf2-a464-b45d6a5cbe6f",
  pageTypeSlug: "world-skill",
  slug: "aspect-of-the-champion",
  title: "Aspect of the Champion",
  worldSlug: "the-wandering-inn",
  evolvesToSlugs: ["supreme-aspect-of-the-champion"],
  references: "jsonl",
} as const satisfies WorldSkill
