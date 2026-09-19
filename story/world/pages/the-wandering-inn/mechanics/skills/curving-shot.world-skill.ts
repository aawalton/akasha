import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const curvingShot = {
  id: "01a06575-97ff-7ab6-8bc5-1729394e0ea1",
  type: "page-type/world-skill",
  slug: "curving-shot",
  title: "Curving Shot",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
