import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const edictOfTheBlooded = {
  id: "01a06575-9806-7fc0-88fc-5cbef006fbff",
  type: "page-type/world-skill",
  slug: "edict-of-the-blooded",
  title: "Edict of the Blooded",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
