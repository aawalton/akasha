import type { WorldSkill } from "../../world-skill.page-type.ts"

export const otherMeSSkills = {
  id: "01a0657d-027d-7c11-a00d-a187f324d814",
  pageTypeSlug: "world-skill",
  slug: "other-me-s-skills",
  title: "Other Me’s Skills",
  worldSlug: "the-wandering-inn",
  evolvesFromSlugs: ["other-me-s-skill"],
  references: "jsonl",
} as const satisfies WorldSkill
