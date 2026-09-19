import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const armoredAdvance = {
  id: "01a06575-97ec-7f5d-91d3-889047832564",
  type: "page-type/world-skill",
  slug: "armored-advance",
  title: "Armored Advance",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
