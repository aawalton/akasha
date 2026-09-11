import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const swordOfJustice = {
  id: "01a0657d-0307-7571-a70e-1f5593d4ef7f",
  type: "world-skill",
  slug: "sword-of-justice",
  title: "Sword of Justice",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
