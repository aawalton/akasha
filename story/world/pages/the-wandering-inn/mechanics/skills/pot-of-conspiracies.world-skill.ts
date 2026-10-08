import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const potOfConspiracies = {
  id: "01a0657d-0295-7aae-8c89-0f898bf2805c",
  type: "page-type/world-skill",
  slug: "pot-of-conspiracies",
  title: "Pot of Conspiracies",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  evolvesFromSlugs: ["world-skill/pot-of-secrets"],
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.613Z",
  updatedAt: "2026-09-22T18:27:39.000Z",
} as const satisfies WorldSkill
