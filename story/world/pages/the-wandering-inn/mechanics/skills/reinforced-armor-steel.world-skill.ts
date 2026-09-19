import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const reinforcedArmorSteel = {
  id: "01a0657d-02a6-76be-aa02-398cbc0e9429",
  type: "page-type/world-skill",
  slug: "reinforced-armor-steel",
  title: "Reinforced Armor (Steel)",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
