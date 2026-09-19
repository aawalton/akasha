import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const longrangeShot = {
  id: "01a0657d-0240-7a8e-a5a3-f841823ca04a",
  type: "page-type/world-skill",
  slug: "longrange-shot",
  title: "Longrange Shot",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
