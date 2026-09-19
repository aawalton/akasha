import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const doubleSpeedByWindAndOar = {
  id: "01a06575-9805-78a0-9a2c-11e9c105c25e",
  type: "page-type/world-skill",
  slug: "double-speed-by-wind-and-oar",
  title: "Double Speed, By Wind and Oar",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
