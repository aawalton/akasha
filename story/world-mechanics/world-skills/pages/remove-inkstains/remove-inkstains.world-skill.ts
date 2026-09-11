import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const removeInkstains = {
  id: "01a0657d-02b0-71b5-a685-97bfb1bddb75",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "remove-inkstains",
  title: "Remove Inkstains",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
