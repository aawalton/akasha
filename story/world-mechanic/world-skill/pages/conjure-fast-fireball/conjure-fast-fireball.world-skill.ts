import type { WorldSkill } from "akasha/story/world-mechanic/world-skill/world-skill.page-type.types.ts"

export const conjureFastFireball = {
  id: "01a06575-97fc-7913-96ec-dbfc7a8584b6",
  type: "world-skill",
  slug: "conjure-fast-fireball",
  title: "Conjure Fast Fireball",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
