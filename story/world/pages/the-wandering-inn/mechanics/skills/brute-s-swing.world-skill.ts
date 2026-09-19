import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const bruteSSwing = {
  id: "01a06575-97f9-7f6c-8749-17292b978ada",
  type: "page-type/world-skill",
  slug: "brute-s-swing",
  title: "Brute’s Swing",
  world: "world/the-wandering-inn",
  evolvesToSlugs: ["knight-s-riposte"],
  references: "jsonl",
} as const satisfies WorldSkill
