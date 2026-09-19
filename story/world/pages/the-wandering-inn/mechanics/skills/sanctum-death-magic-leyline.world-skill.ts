import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const sanctumDeathMagicLeyline = {
  id: "01a0657d-02b7-79bc-9d04-e615a7d53b97",
  type: "page-type/world-skill",
  slug: "sanctum-death-magic-leyline",
  title: "Sanctum: Death Magic Leyline",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
