import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const charmingSmile = {
  id: "01a06575-97fb-70c8-bdd8-4d0763e84381",
  type: "world-skill",
  slug: "charming-smile",
  title: "Charming Smile",
  world: "the-wandering-inn",
  evolvesToSlugs: ["enthralling-glance"],
  references: "jsonl",
} as const satisfies WorldSkill
