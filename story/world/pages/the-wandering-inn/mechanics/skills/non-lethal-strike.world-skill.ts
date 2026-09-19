import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const nonLethalStrike = {
  id: "01a0657d-027b-7e6e-b8e0-933c7f27902f",
  type: "page-type/world-skill",
  slug: "non-lethal-strike",
  title: "Non-Lethal Strike",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
