import type { WorldSkill } from "../../world-skill.page-type.ts"

export const mirageCut = {
  id: "01a0657d-026f-7581-8e3a-43756c4f5947",
  pageTypeSlug: "world-skill",
  slug: "mirage-cut",
  title: "Mirage Cut",
  worldSlug: "the-wandering-inn",
  evolvesFromSlugs: ["power-strike"],
  references: "jsonl",
} as const satisfies WorldSkill
