import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const aspectOfSilver = {
  id: "01a06575-97ee-7a79-a332-f164af3687ba",
  type: "page-type/world-skill",
  slug: "aspect-of-silver",
  title: "Aspect of Silver",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
