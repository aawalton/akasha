import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const auraOfFlame = {
  id: "01a06575-97ee-747a-a6d7-a58ebf1efc41",
  type: "page-type/world-skill",
  slug: "aura-of-flame",
  title: "Aura of Flame",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
