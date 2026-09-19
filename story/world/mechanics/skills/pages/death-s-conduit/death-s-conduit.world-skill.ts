import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const deathSConduit = {
  id: "01a06575-9802-71cf-b4ee-c7decba0ec4d",
  type: "page-type/world-skill",
  slug: "death-s-conduit",
  title: "Death’s Conduit",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
