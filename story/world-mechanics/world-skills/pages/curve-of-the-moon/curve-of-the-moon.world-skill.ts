import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const curveOfTheMoon = {
  id: "01a06575-97ff-7edb-b8c1-bb24123d0151",
  type: "world-skill",
  slug: "curve-of-the-moon",
  title: "Curve of the Moon",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
