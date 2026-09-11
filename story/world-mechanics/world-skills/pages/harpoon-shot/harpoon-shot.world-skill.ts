import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const harpoonShot = {
  id: "01a06575-9818-7a5b-81f0-c44b23d730a1",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "harpoon-shot",
  title: "Harpoon Shot",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
