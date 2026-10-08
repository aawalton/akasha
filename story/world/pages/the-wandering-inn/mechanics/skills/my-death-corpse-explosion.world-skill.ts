import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const myDeathCorpseExplosion = {
  id: "01a0657d-0270-789e-9fba-7591bf252570",
  type: "page-type/world-skill",
  slug: "my-death-corpse-explosion",
  title: "My Death: Corpse Explosion",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.576Z",
  updatedAt: "2026-09-22T13:32:52.000Z",
} as const satisfies WorldSkill
