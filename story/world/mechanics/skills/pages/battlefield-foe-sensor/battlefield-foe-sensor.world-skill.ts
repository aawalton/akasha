import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const battlefieldFoeSensor = {
  id: "01a06575-97f4-7db6-8c1a-f793f1dcf10b",
  type: "page-type/world-skill",
  slug: "battlefield-foe-sensor",
  title: "Battlefield – Foe Sensor",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
