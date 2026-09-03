import type { WorldSkill } from "../world-skill.page-type.ts"

export const potOfSecrets = {
  id: "01a0657d-0295-7674-8469-c74c4e240161",
  pageTypeSlug: "world-skill",
  slug: "pot-of-secrets",
  title: "Pot of Secrets",
  worldSlug: "the-wandering-inn",
  evolvesToSlugs: ["pot-of-conspiracies"],
} as const satisfies WorldSkill
