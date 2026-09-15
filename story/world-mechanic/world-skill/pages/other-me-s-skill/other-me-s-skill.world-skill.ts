import type { WorldSkill } from "akasha/story/world-mechanic/world-skill/world-skill.page-type.types.ts"

export const otherMeSSkill = {
  id: "01a0657d-027c-75f1-bf2c-376d6024c652",
  type: "world-skill",
  slug: "other-me-s-skill",
  title: "Other Me’s Skill",
  world: "world/the-wandering-inn",
  aliases: ["other-me-s-skills"],
  evolvesToSlugs: ["other-me-s-skills"],
  references: "jsonl",
} as const satisfies WorldSkill
