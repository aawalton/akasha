import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const pooExplosion = {
  id: "01a0657d-0295-79ef-bccb-55e70437a83c",
  type: "page-type/world-skill",
  slug: "poo-explosion",
  title: "Poo Explosion",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
