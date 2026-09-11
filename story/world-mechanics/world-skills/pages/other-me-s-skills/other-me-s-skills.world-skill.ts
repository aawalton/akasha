import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const otherMeSSkills = {
  id: "01a0657d-027d-7c11-a00d-a187f324d814",
  type: "world-skill",
  slug: "other-me-s-skills",
  title: "Other Me’s Skills",
  world: "the-wandering-inn",
  evolvesFromSlugs: ["other-me-s-skill"],
  references: "jsonl",
} as const satisfies WorldSkill
