import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const bugAttractingLantern = {
  id: "01a06575-97f9-7232-a642-b1b90a538f8c",
  type: "page-type/world-skill",
  slug: "bug-attracting-lantern",
  title: "Bug Attracting Lantern",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
