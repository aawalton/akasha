import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const royalSlap = {
  id: "01a0657d-02b7-7ccf-a89e-31f3860dd4d5",
  type: "page-type/world-skill",
  slug: "royal-slap",
  title: "Royal Slap",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  evolvesToSlugs: ["world-skill/ghost-s-hand"],
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.647Z",
  updatedAt: "2026-09-22T18:28:27.000Z",
} as const satisfies WorldSkill
