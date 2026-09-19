import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const theHammerOfManus = {
  id: "01a0657d-0312-72d0-9928-14c1e95a388b",
  type: "page-type/world-skill",
  slug: "the-hammer-of-manus",
  title: "The Hammer of Manus",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
