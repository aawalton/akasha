import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const rattlingCharge = {
  id: "01a0657d-02a4-7e0c-afde-4f4037f90054",
  type: "page-type/world-skill",
  slug: "rattling-charge",
  title: "Rattling Charge",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
