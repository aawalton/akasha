import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const extendedSweep = {
  id: "01a06575-980a-7669-8e44-3d28acfd37ce",
  type: "world-skill",
  slug: "extended-sweep",
  title: "Extended Sweep",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
