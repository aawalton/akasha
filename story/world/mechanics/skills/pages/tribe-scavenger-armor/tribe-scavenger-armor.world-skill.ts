import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const tribeScavengerArmor = {
  id: "01a0657d-0316-7642-855b-79179c4e5343",
  type: "page-type/world-skill",
  slug: "tribe-scavenger-armor",
  title: "Tribe: Scavenger Armor",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
