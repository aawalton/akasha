import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const quakeBlow = {
  id: "01a0657d-029a-75a2-aafa-e472c433d272",
  type: "world-skill",
  slug: "quake-blow",
  title: "Quake Blow",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
