import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const theHurricaneBegins = {
  id: "01a0657d-0312-76f7-b381-c9a185d7f2cc",
  type: "page-type/world-skill",
  slug: "the-hurricane-begins",
  title: "The Hurricane Begins",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
