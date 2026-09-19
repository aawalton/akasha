import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const gallowsSwing = {
  id: "01a06575-9811-7d57-b116-8c0d7f9dbddd",
  type: "page-type/world-skill",
  slug: "gallows-swing",
  title: "Gallows Swing",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
