import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const chosenBlow = {
  id: "01a06575-97fb-769b-a915-244b4a5b41c0",
  type: "page-type/world-skill",
  slug: "chosen-blow",
  title: "Chosen Blow",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
