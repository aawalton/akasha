import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const flawlessStride = {
  id: "01a06575-980e-71b2-8983-38b51bc9db71",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "flawless-stride",
  title: "Flawless Stride",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
