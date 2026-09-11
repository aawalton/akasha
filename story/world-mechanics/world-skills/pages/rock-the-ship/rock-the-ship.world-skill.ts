import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const rockTheShip = {
  id: "01a0657d-02b6-7081-9753-ab20fee54195",
  type: "world-skill",
  slug: "rock-the-ship",
  title: "Rock the Ship",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
