import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const curveShot = {
  id: "01a06575-97ff-7a77-91f0-91f5096183cc",
  type: "page-type/world-skill",
  slug: "curve-shot",
  title: "Curve Shot",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
