import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const finerThread = {
  id: "01a06575-980c-7035-9be7-81b024b61317",
  type: "page-type/world-skill",
  slug: "finer-thread",
  title: "Finer Thread",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
