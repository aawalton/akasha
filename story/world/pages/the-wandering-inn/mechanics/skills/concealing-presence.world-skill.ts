import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const concealingPresence = {
  id: "01a06575-97fc-7a24-9119-e16d6289e3ac",
  type: "page-type/world-skill",
  slug: "concealing-presence",
  title: "Concealing Presence",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
