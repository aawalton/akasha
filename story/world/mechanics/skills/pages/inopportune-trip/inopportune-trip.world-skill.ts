import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const inopportuneTrip = {
  id: "01a06575-981f-7826-82ae-678278cce4f2",
  type: "page-type/world-skill",
  slug: "inopportune-trip",
  title: "Inopportune Trip",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
