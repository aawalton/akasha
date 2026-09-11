import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const learnByExample = {
  id: "01a06575-9822-7974-b687-554c7e48bcdb",
  type: "world-skill",
  slug: "learn-by-example",
  title: "Learn by Example",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
