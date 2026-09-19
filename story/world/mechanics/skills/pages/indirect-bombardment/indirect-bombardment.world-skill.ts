import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const indirectBombardment = {
  id: "01a06575-981e-779c-a232-d1a643bbfbf0",
  type: "page-type/world-skill",
  slug: "indirect-bombardment",
  title: "Indirect Bombardment",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
