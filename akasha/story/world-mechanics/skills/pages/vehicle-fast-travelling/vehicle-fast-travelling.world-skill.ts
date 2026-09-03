import type { WorldSkill } from "../../world-skill.page-type.ts"

export const vehicleFastTravelling = {
  id: "01a0657d-0320-7299-90b1-d1ef3fe0df64",
  pageTypeSlug: "world-skill",
  slug: "vehicle-fast-travelling",
  title: "Vehicle: Fast Travelling",
  worldSlug: "the-wandering-inn",
  evolvesToSlugs: ["vehicle-magical-delivery"],
  references: "jsonl",
} as const satisfies WorldSkill
