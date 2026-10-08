import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const sensorNetwork = {
  id: "01a0657d-02bf-753a-96be-c6c552cc927b",
  type: "page-type/world-skill",
  slug: "sensor-network",
  title: "Sensor Network",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.655Z",
  updatedAt: "2026-09-22T13:33:17.000Z",
} as const satisfies WorldSkill
