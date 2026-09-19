import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const steadySelf = {
  id: "01a0657d-02f9-773d-bf6c-a7be19147ab8",
  type: "page-type/world-skill",
  slug: "steady-self",
  title: "Steady Self",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
