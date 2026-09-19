import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const stealthguard = {
  id: "01a0657d-02fa-7515-938e-ced1457ab163",
  type: "page-type/world-skill",
  slug: "stealthguard",
  title: "Stealthguard",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
