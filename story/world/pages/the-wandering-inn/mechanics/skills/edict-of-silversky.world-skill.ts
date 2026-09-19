import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const edictOfSilversky = {
  id: "01a06575-9806-724a-97c3-a5ff808d4f78",
  type: "page-type/world-skill",
  slug: "edict-of-silversky",
  title: "Edict of Silversky",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
