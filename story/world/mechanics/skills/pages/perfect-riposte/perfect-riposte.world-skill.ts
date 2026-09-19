import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const perfectRiposte = {
  id: "01a0657d-028f-77d3-a732-6363512ec01a",
  type: "page-type/world-skill",
  slug: "perfect-riposte",
  title: "Perfect Riposte",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
