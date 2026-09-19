import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const oblivionHit = {
  id: "01a0657d-027b-798f-8507-0097445d7d20",
  type: "page-type/world-skill",
  slug: "oblivion-hit",
  title: "Oblivion Hit",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
