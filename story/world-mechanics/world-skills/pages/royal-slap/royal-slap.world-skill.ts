import type { WorldSkill } from "../../world-skill.page-type.ts"

export const royalSlap = {
  id: "01a0657d-02b7-7ccf-a89e-31f3860dd4d5",
  pageTypeSlug: "world-skill",
  slug: "royal-slap",
  title: "Royal Slap",
  worldSlug: "the-wandering-inn",
  evolvesToSlugs: ["ghost-s-hand"],
  references: "jsonl",
} as const satisfies WorldSkill
