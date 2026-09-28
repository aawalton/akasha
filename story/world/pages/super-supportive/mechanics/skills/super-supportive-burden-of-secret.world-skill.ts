import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const superSupportiveBurdenOfSecret = {
  id: "01a0e9f1-d241-7bcf-873a-256f6342802c",
  type: "page-type/world-skill",
  slug: "super-supportive-burden-of-secret",
  title: "Burden of Secret",
  world: "world/super-supportive",
  description:
    "A facet that takes a secret out of the speaker's mind and holds it while preserved.",
} as const satisfies WorldSkill
