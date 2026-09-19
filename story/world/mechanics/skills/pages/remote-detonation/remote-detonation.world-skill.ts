import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const remoteDetonation = {
  id: "01a0657d-02b0-79db-bf18-6ab7141fc023",
  type: "page-type/world-skill",
  slug: "remote-detonation",
  title: "Remote Detonation",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
