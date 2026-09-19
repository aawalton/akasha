import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const piercingShots = {
  id: "01a0657d-0294-799d-a611-bf8b88f31e59",
  type: "page-type/world-skill",
  slug: "piercing-shots",
  title: "Piercing Shots",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
