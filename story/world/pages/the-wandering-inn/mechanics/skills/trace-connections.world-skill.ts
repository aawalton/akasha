import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const traceConnections = {
  id: "01a0657d-0316-7cd6-a044-04a3552f7b42",
  type: "page-type/world-skill",
  slug: "trace-connections",
  title: "TRACE CONNECTIONS",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
