import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const phantomGrace = {
  id: "01a0657d-0290-7263-a051-c9fc84f02aa0",
  type: "page-type/world-skill",
  slug: "phantom-grace",
  title: "Phantom Grace",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
