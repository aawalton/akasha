import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const quickStep = {
  id: "01a0657d-029b-7c42-8cb2-19a961687a1a",
  type: "page-type/world-skill",
  slug: "quick-step",
  title: "Quick Step",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  evolvesToSlugs: ["world-skill/flash-step"],
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.619Z",
  updatedAt: "2026-09-22T18:28:27.000Z",
} as const satisfies WorldSkill
