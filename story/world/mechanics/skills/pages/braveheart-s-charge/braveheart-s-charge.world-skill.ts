import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const braveheartSCharge = {
  id: "01a06575-97f8-7074-9efb-83d2bbc39e7e",
  type: "page-type/world-skill",
  slug: "braveheart-s-charge",
  title: "Braveheart’s Charge",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
