import type { WorldSkill } from "akasha/story/world-mechanic/world-skill/world-skill.page-type.types.ts"

export const faintPresence = {
  id: "01a06575-980b-7233-80be-dde163182b40",
  type: "world-skill",
  slug: "faint-presence",
  title: "Faint Presence",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
