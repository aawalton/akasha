import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const perfectRiposte = {
  id: "01a0657d-028f-77d3-a732-6363512ec01a",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "perfect-riposte",
  title: "Perfect Riposte",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
