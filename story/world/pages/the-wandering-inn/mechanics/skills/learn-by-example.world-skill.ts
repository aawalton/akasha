import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const learnByExample = {
  id: "01a06575-9822-7974-b687-554c7e48bcdb",
  type: "page-type/world-skill",
  slug: "learn-by-example",
  title: "Learn by Example",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.610Z",
  updatedAt: "2026-09-22T13:32:35.000Z",
} as const satisfies WorldSkill
