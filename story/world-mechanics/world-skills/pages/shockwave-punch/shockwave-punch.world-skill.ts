import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const shockwavePunch = {
  id: "01a0657d-02c1-7c84-b210-9159f62be343",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "shockwave-punch",
  title: "Shockwave Punch",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
