import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const steelcutSunder = {
  id: "01a0657d-02fa-7788-bb13-5394afdd66bb",
  type: "page-type/world-skill",
  slug: "steelcut-sunder",
  title: "Steelcut Sunder",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
