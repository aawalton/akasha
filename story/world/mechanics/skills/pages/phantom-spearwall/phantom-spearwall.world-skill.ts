import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const phantomSpearwall = {
  id: "01a0657d-0290-709f-8d32-fa43679735b9",
  type: "page-type/world-skill",
  slug: "phantom-spearwall",
  title: "Phantom Spearwall",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
