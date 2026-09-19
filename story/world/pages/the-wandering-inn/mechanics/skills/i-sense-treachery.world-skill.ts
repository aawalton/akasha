import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const iSenseTreachery = {
  id: "01a06575-981c-7768-a701-8caf19e06473",
  type: "page-type/world-skill",
  slug: "i-sense-treachery",
  title: "I Sense Treachery",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
