import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const burningBlade = {
  id: "01a06575-97f9-72b1-9a73-b04df38a3ad2",
  type: "world-skill",
  slug: "burning-blade",
  title: "Burning Blade",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
