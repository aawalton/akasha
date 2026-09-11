import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const myDeathCorpseExplosion = {
  id: "01a0657d-0270-789e-9fba-7591bf252570",
  type: "world-skill",
  slug: "my-death-corpse-explosion",
  title: "My Death: Corpse Explosion",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
