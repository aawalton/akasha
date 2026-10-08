import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const vehicleFastTravelling = {
  id: "01a0657d-0320-7299-90b1-d1ef3fe0df64",
  type: "page-type/world-skill",
  slug: "vehicle-fast-travelling",
  title: "Vehicle: Fast Travelling",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  evolvesToSlugs: ["world-skill/vehicle-magical-delivery"],
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.752Z",
  updatedAt: "2026-09-22T18:28:27.000Z",
} as const satisfies WorldSkill
