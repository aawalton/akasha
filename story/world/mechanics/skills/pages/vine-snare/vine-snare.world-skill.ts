import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const vineSnare = {
  id: "01a0657d-0320-77fd-ae44-792109abd127",
  type: "page-type/world-skill",
  slug: "vine-snare",
  title: "Vine Snare",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
