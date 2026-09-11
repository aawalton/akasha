import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const nonLethalStrike = {
  id: "01a0657d-027b-7e6e-b8e0-933c7f27902f",
  type: "world-skill",
  slug: "non-lethal-strike",
  title: "Non-Lethal Strike",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
