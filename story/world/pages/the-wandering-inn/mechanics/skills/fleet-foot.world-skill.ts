import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const fleetFoot = {
  id: "01a06575-980e-7b17-b4d2-530cb9b417ca",
  type: "page-type/world-skill",
  slug: "fleet-foot",
  title: "Fleet Foot",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
