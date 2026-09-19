import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const shipArmorPiercingShot = {
  id: "01a0657d-02c0-749c-bd5f-5b90a77c5ba2",
  type: "page-type/world-skill",
  slug: "ship-armor-piercing-shot",
  title: "Ship: Armor-piercing Shot",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
