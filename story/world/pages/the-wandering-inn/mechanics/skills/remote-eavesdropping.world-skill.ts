import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const remoteEavesdropping = {
  id: "01a0657d-02b0-7246-9e20-9b4e58966b9a",
  type: "page-type/world-skill",
  slug: "remote-eavesdropping",
  title: "Remote Eavesdropping",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.640Z",
  updatedAt: "2026-09-22T13:33:09.000Z",
} as const satisfies WorldSkill
