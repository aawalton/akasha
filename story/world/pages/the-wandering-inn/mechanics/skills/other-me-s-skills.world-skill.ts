import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const otherMeSSkills = {
  id: "01a0657d-027d-7c11-a00d-a187f324d814",
  type: "page-type/world-skill",
  slug: "other-me-s-skills",
  title: "Other Me’s Skills",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  evolvesFromSlugs: ["world-skill/other-me-s-skill"],
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.589Z",
  updatedAt: "2026-09-22T18:27:39.000Z",
} as const satisfies WorldSkill
