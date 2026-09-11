import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const deathGrip = {
  id: "01a06575-9802-7526-9ad8-8e90f261de9c",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "death-grip",
  title: "Death Grip",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
