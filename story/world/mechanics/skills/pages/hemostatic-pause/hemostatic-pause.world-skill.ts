import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const hemostaticPause = {
  id: "01a06575-9819-7dd1-ac2e-345f7874d514",
  type: "page-type/world-skill",
  slug: "hemostatic-pause",
  title: "Hemostatic Pause",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
