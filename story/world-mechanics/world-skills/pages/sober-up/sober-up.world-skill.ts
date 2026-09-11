import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const soberUp = {
  id: "01a0657d-02c7-750f-a3d4-89fe566e319f",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "sober-up",
  title: "Sober Up",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
