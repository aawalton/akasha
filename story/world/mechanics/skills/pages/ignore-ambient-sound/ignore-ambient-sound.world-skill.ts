import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const ignoreAmbientSound = {
  id: "01a06575-981c-7080-b986-03cad07de936",
  type: "page-type/world-skill",
  slug: "ignore-ambient-sound",
  title: "Ignore Ambient Sound",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
