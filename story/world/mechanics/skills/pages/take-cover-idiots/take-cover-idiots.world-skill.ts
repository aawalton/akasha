import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const takeCoverIdiots = {
  id: "01a0657d-0307-7dd0-92e5-8ef51760c05c",
  type: "page-type/world-skill",
  slug: "take-cover-idiots",
  title: "Take Cover, Idiots",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
