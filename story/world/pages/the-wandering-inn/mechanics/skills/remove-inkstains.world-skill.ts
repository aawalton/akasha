import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const removeInkstains = {
  id: "01a0657d-02b0-71b5-a685-97bfb1bddb75",
  type: "page-type/world-skill",
  slug: "remove-inkstains",
  title: "Remove Inkstains",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
