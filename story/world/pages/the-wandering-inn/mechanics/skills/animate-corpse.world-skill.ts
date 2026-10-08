import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const animateCorpse = {
  id: "01a06575-97eb-7aab-8167-a58ed3363b88",
  type: "page-type/world-skill",
  slug: "animate-corpse",
  title: "Animate Corpse",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.555Z",
  updatedAt: "2026-09-22T13:31:32.000Z",
} as const satisfies WorldSkill
