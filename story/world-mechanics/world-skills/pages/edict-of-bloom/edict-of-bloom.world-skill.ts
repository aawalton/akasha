import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const edictOfBloom = {
  id: "01a06575-9806-70cb-b1ac-561e8ce3cd9a",
  type: "world-skill",
  slug: "edict-of-bloom",
  title: "Edict of Bloom",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
