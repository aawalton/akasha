import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const weakLuckyDraw = {
  id: "01a0657d-032d-720d-a1cc-6474bc26eeb4",
  type: "page-type/world-skill",
  slug: "weak-lucky-draw",
  title: "Weak Lucky Draw",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
