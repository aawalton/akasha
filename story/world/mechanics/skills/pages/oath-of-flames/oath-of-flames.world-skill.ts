import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const oathOfFlames = {
  id: "01a0657d-027b-7923-a55c-80715991de41",
  type: "page-type/world-skill",
  slug: "oath-of-flames",
  title: "Oath of Flames",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
