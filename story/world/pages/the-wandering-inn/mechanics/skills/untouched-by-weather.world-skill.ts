import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const untouchedByWeather = {
  id: "01a0657d-0320-79f4-aae4-c5e51e49db95",
  type: "page-type/world-skill",
  slug: "untouched-by-weather",
  title: "Untouched by Weather",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
