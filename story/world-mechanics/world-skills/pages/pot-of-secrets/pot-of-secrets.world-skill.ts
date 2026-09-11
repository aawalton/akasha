import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const potOfSecrets = {
  id: "01a0657d-0295-7674-8469-c74c4e240161",
  type: "world-skill",
  slug: "pot-of-secrets",
  title: "Pot of Secrets",
  world: "the-wandering-inn",
  evolvesToSlugs: ["pot-of-conspiracies"],
} as const satisfies WorldSkill
