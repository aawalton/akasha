import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const empireFieldOfHarvests = {
  id: "01a06575-9807-7a68-884d-445a949e09ef",
  type: "page-type/world-skill",
  slug: "empire-field-of-harvests",
  title: "Empire: Field of Harvests",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
