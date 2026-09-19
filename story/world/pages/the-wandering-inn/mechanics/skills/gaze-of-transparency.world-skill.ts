import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const gazeOfTransparency = {
  id: "01a06575-9814-7239-9a14-12af8c8c1761",
  type: "page-type/world-skill",
  slug: "gaze-of-transparency",
  title: "Gaze of Transparency",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
