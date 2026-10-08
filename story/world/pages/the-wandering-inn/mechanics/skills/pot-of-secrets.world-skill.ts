import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const potOfSecrets = {
  id: "01a0657d-0295-7674-8469-c74c4e240161",
  type: "page-type/world-skill",
  slug: "pot-of-secrets",
  title: "Pot of Secrets",
  world: "world/the-wandering-inn",
  evolvesToSlugs: ["world-skill/pot-of-conspiracies"],
  createdAt: "2026-09-03T04:18:06.613Z",
  updatedAt: "2026-09-22T18:28:27.000Z",
} as const satisfies WorldSkill
