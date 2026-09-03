import type { WorldSkill } from "../../world-skill.page-type.ts"

export const charmingSmile = {
  id: "01a06575-97fb-70c8-bdd8-4d0763e84381",
  pageTypeSlug: "world-skill",
  slug: "charming-smile",
  title: "Charming Smile",
  worldSlug: "the-wandering-inn",
  evolvesToSlugs: ["enthralling-glance"],
  references: "jsonl",
} as const satisfies WorldSkill
