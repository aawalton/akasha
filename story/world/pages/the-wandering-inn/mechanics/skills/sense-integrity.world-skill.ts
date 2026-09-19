import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const senseIntegrity = {
  id: "01a0657d-02be-72a8-bdb8-0273b8d54a52",
  type: "page-type/world-skill",
  slug: "sense-integrity",
  title: "Sense Integrity",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
