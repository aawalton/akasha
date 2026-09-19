import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const horrendousWeather = {
  id: "01a06575-981a-7c7f-a643-85761974833d",
  type: "page-type/world-skill",
  slug: "horrendous-weather",
  title: "Horrendous Weather",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
