import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const sympatheticWitchcraft = {
  id: "01a0657d-0307-7bd8-8cf1-963a04d227f0",
  type: "page-type/world-skill",
  slug: "sympathetic-witchcraft",
  title: "Sympathetic Witchcraft",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
