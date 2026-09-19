import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const wingsOfEscieda = {
  id: "01a0657d-0337-7168-a75f-6f98243d39e1",
  type: "page-type/world-skill",
  slug: "wings-of-escieda",
  title: "Wings of Escieda",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
