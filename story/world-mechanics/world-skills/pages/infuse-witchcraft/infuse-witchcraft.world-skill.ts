import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const infuseWitchcraft = {
  id: "01a06575-981e-71f2-aefe-f8c4a805782c",
  type: "world-skill",
  slug: "infuse-witchcraft",
  title: "Infuse Witchcraft",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
