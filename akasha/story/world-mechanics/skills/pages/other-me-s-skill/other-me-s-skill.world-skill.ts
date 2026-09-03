import type { WorldSkill } from "../../world-skill.page-type.ts"

export const otherMeSSkill = {
  id: "01a0657d-027c-75f1-bf2c-376d6024c652",
  pageTypeSlug: "world-skill",
  slug: "other-me-s-skill",
  title: "Other Me’s Skill",
  worldSlug: "the-wandering-inn",
  aliases: ["other-me-s-skills"],
  evolvesToSlugs: ["other-me-s-skills"],
  references: "jsonl",
} as const satisfies WorldSkill
