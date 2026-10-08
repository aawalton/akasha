import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const minotaurPunch = {
  id: "01a0657d-024d-7bf0-96f1-c9ec0f602e19",
  type: "page-type/world-skill",
  slug: "minotaur-punch",
  title: "Minotaur Punch",
  world: "world/the-wandering-inn",
  appearanceCount: 43,
  evolvesFromSlugs: ["world-skill/power-strike"],
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.541Z",
  updatedAt: "2026-09-22T18:27:39.000Z",
} as const satisfies WorldSkill
