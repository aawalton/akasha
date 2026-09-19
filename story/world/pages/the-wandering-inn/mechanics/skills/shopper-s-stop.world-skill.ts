import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const shopperSStop = {
  id: "01a0657d-02c1-7045-b3c2-19892c0d0dde",
  type: "page-type/world-skill",
  slug: "shopper-s-stop",
  title: "Shopper’s Stop",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
