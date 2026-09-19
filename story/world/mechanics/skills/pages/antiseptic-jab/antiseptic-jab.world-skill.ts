import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const antisepticJab = {
  id: "01a06575-97eb-73c6-b557-43d2283388ba",
  type: "page-type/world-skill",
  slug: "antiseptic-jab",
  title: "Antiseptic Jab",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
