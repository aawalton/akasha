import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const curveOfTheMoon = {
  id: "01a06575-97ff-7edb-b8c1-bb24123d0151",
  type: "page-type/world-skill",
  slug: "curve-of-the-moon",
  title: "Curve of the Moon",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
