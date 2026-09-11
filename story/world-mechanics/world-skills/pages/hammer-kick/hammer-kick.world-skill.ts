import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const hammerKick = {
  id: "01a06575-9818-75f5-9a85-f3a4e8ad3e92",
  type: "world-skill",
  slug: "hammer-kick",
  title: "Hammer Kick",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
