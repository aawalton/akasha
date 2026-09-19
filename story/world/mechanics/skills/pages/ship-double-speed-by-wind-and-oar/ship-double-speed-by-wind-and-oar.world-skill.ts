import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const shipDoubleSpeedByWindAndOar = {
  id: "01a0657d-02c0-7637-9bdc-f3cb3cc117a2",
  type: "page-type/world-skill",
  slug: "ship-double-speed-by-wind-and-oar",
  title: "Ship: Double Speed, By Wind and Oar",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
