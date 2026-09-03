import type { WorldSkill } from "../../world-skill.page-type.ts"

export const yawningBite = {
  id: "01a0657d-0338-76c0-aa30-a6ebd94aba76",
  pageTypeSlug: "world-skill",
  slug: "yawning-bite",
  title: "Yawning Bite",
  worldSlug: "the-wandering-inn",
  evolvesFromSlugs: ["huge-chomp"],
  references: "jsonl",
} as const satisfies WorldSkill
