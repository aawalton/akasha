import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const otherMeSSkill = {
  id: "01a0657d-027c-75f1-bf2c-376d6024c652",
  type: "page-type/world-skill",
  slug: "other-me-s-skill",
  title: "Other Me’s Skill",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  aliases: ["other-me-s-skills"],
  evolvesToSlugs: ["world-skill/other-me-s-skills"],
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.588Z",
  updatedAt: "2026-09-22T18:28:27.000Z",
} as const satisfies WorldSkill
