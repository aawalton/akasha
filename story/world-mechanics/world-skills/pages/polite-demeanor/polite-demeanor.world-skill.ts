import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const politeDemeanor = {
  id: "01a0657d-0295-788b-904d-29f98b9b5afd",
  type: "world-skill",
  slug: "polite-demeanor",
  title: "Polite Demeanor",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
