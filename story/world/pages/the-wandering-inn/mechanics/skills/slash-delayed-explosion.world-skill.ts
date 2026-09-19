import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const slashDelayedExplosion = {
  id: "01a0657d-02c6-70b7-bee5-a385a857640e",
  type: "page-type/world-skill",
  slug: "slash-delayed-explosion",
  title: "Slash: Delayed Explosion",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
