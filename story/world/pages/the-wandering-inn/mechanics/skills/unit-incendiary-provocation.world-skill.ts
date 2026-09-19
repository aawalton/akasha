import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const unitIncendiaryProvocation = {
  id: "01a0657d-031f-75f2-9a5d-df223185c5f4",
  type: "page-type/world-skill",
  slug: "unit-incendiary-provocation",
  title: "Unit: Incendiary Provocation",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
