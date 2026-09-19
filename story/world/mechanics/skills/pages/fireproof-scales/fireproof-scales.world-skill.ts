import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const fireproofScales = {
  id: "01a06575-980d-7174-884b-aadfdafd8097",
  type: "page-type/world-skill",
  slug: "fireproof-scales",
  title: "Fireproof Scales",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
