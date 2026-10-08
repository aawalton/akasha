import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const knightSRiposte = {
  id: "01a06575-9821-735b-92da-fb9891bf2cfc",
  type: "page-type/world-skill",
  slug: "knight-s-riposte",
  title: "Knight’s Riposte",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  evolvesFromSlugs: ["world-skill/brute-s-swing"],
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.609Z",
  updatedAt: "2026-09-22T18:27:39.000Z",
} as const satisfies WorldSkill
