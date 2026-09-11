import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const automaticRecitationLiterature = {
  id: "01a06575-97f0-7e84-8c5e-1ec5afe42228",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "automatic-recitation-literature",
  title: "Automatic Recitation: Literature",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
