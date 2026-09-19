import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const owlSVision = {
  id: "01a0657d-027f-7220-823b-879d06eae7b5",
  type: "page-type/world-skill",
  slug: "owl-s-vision",
  title: "Owl’s Vision",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
