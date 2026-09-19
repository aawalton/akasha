import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const returnWeapon = {
  id: "01a0657d-02b1-7d75-998e-86f0260e215c",
  type: "page-type/world-skill",
  slug: "return-weapon",
  title: "Return Weapon",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
