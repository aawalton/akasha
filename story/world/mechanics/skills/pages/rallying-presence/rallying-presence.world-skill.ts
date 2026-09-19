import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const rallyingPresence = {
  id: "01a0657d-029c-784e-a3f7-28f6725bb13b",
  type: "page-type/world-skill",
  slug: "rallying-presence",
  title: "Rallying Presence",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
