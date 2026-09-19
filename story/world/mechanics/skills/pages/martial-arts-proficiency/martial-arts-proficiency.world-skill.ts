import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const martialArtsProficiency = {
  id: "01a0657d-024b-7778-9827-a3c60f008d28",
  type: "page-type/world-skill",
  slug: "martial-arts-proficiency",
  title: "Martial Arts Proficiency",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
