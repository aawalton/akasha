import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const hatTrickMinorArcana = {
  id: "01a06575-9818-70de-8cd8-2712f96e693c",
  type: "page-type/world-skill",
  slug: "hat-trick-minor-arcana",
  title: "Hat Trick (Minor Arcana)",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
