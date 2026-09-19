import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const danceOfTheMantis = {
  id: "01a06575-9800-7453-bb0f-cad144f81e52",
  type: "page-type/world-skill",
  slug: "dance-of-the-mantis",
  title: "Dance of the Mantis",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
