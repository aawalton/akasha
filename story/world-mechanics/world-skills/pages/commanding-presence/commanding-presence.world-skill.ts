import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const commandingPresence = {
  id: "01a06575-97fc-74a5-8c2c-e95cb9ee2c37",
  type: "world-skill",
  slug: "commanding-presence",
  title: "Commanding Presence",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
