import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const recallWeaponSpear = {
  id: "01a0657d-02a5-7f36-95c5-1fd82ae531dd",
  type: "page-type/world-skill",
  slug: "recall-weapon-spear",
  title: "Recall Weapon: Spear",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
