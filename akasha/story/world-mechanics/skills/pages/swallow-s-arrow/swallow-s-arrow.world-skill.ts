import type { WorldSkill } from "../../world-skill.page-type.ts"

export const swallowSArrow = {
  id: "01a0657d-0303-78ce-a3b6-5b97ace94923",
  pageTypeSlug: "world-skill",
  slug: "swallow-s-arrow",
  title: "Swallow’s Arrow",
  worldSlug: "the-wandering-inn",
  evolvesToSlugs: ["lesser-dragonbreath-arrow-lightning"],
  references: "jsonl",
} as const satisfies WorldSkill
