import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const deathSConduit = {
  id: "01a06575-9802-71cf-b4ee-c7decba0ec4d",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "death-s-conduit",
  title: "Death’s Conduit",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
