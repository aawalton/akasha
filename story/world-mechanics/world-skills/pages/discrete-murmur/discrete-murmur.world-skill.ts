import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const discreteMurmur = {
  id: "01a06575-9804-790f-9a56-611c1d059d0e",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "discrete-murmur",
  title: "Discrete Murmur",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
