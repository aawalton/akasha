import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const foeSensor = {
  id: "01a06575-980f-7664-b696-1857754cdd7a",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "foe-sensor",
  title: "Foe Sensor",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
