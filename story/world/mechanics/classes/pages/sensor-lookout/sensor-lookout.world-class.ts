import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const sensorLookout = {
  id: "01a06586-0a2f-78d9-abc1-4fabd1e39d68",
  type: "page-type/world-class",
  slug: "sensor-lookout",
  title: "Sensor Lookout",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
