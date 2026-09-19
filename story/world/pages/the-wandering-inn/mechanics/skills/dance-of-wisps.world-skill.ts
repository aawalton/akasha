import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const danceOfWisps = {
  id: "01a06575-9800-7c32-8ddc-420559f60e73",
  type: "page-type/world-skill",
  slug: "dance-of-wisps",
  title: "Dance of Wisps",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
