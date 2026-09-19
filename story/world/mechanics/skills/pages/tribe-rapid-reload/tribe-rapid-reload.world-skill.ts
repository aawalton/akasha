import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const tribeRapidReload = {
  id: "01a0657d-0316-71c1-abe0-2744d4921bbf",
  type: "page-type/world-skill",
  slug: "tribe-rapid-reload",
  title: "Tribe: Rapid Reload",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
