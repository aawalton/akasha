import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const commandLesserUndead = {
  id: "01a06575-97fc-744a-8233-6caaef4d8988",
  type: "page-type/world-skill",
  slug: "command-lesser-undead",
  title: "Command Lesser Undead",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
