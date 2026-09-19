import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const weathersense = {
  id: "01a0657d-032d-76f8-92c2-5ae16d8836e1",
  type: "page-type/world-skill",
  slug: "weathersense",
  title: "Weathersense",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
