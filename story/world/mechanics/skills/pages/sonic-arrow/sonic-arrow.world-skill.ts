import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const sonicArrow = {
  id: "01a0657d-02c7-77cc-baef-a938cf7cc13b",
  type: "page-type/world-skill",
  slug: "sonic-arrow",
  title: "Sonic Arrow",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
