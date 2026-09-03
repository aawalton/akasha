import type { WorldSkill } from "../../world-skill.page-type.ts"

export const potOfConspiracies = {
  id: "01a0657d-0295-7aae-8c89-0f898bf2805c",
  pageTypeSlug: "world-skill",
  slug: "pot-of-conspiracies",
  title: "Pot of Conspiracies",
  worldSlug: "the-wandering-inn",
  evolvesFromSlugs: ["pot-of-secrets"],
  references: "jsonl",
} as const satisfies WorldSkill
