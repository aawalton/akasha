import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const cleaveTheEarth = {
  id: "01a06575-97fb-7f89-8f90-1dca0e352fb1",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "cleave-the-earth",
  title: "Cleave the Earth",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
