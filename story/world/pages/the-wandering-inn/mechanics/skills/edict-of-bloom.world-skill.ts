import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const edictOfBloom = {
  id: "01a06575-9806-70cb-b1ac-561e8ce3cd9a",
  type: "page-type/world-skill",
  slug: "edict-of-bloom",
  title: "Edict of Bloom",
  world: "world/the-wandering-inn",
  appearanceCount: 6,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.582Z",
  updatedAt: "2026-09-22T13:32:04.000Z",
} as const satisfies WorldSkill
