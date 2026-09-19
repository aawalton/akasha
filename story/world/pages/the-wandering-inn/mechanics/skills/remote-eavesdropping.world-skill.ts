import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const remoteEavesdropping = {
  id: "01a0657d-02b0-7246-9e20-9b4e58966b9a",
  type: "page-type/world-skill",
  slug: "remote-eavesdropping",
  title: "Remote Eavesdropping",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
