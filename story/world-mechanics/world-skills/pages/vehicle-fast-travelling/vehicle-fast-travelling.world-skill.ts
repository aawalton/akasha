import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const vehicleFastTravelling = {
  id: "01a0657d-0320-7299-90b1-d1ef3fe0df64",
  type: "world-skill",
  slug: "vehicle-fast-travelling",
  title: "Vehicle: Fast Travelling",
  world: "the-wandering-inn",
  evolvesToSlugs: ["vehicle-magical-delivery"],
  references: "jsonl",
} as const satisfies WorldSkill
