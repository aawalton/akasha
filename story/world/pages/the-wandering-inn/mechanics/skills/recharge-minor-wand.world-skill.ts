import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const rechargeMinorWand = {
  id: "01a0657d-02a5-7839-9917-7a148a0c9f6c",
  type: "page-type/world-skill",
  slug: "recharge-minor-wand",
  title: "Recharge Minor Wand",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
