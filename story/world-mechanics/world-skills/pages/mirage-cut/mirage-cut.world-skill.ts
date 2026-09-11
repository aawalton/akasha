import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const mirageCut = {
  id: "01a0657d-026f-7581-8e3a-43756c4f5947",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "mirage-cut",
  title: "Mirage Cut",
  world: "the-wandering-inn",
  evolvesFromSlugs: ["power-strike"],
  references: "jsonl",
} as const satisfies WorldSkill
