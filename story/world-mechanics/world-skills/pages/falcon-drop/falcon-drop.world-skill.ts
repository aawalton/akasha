import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const falconDrop = {
  id: "01a06575-980b-798c-af75-9352dc5953f5",
  type: "world-skill",
  slug: "falcon-drop",
  title: "Falcon Drop",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
