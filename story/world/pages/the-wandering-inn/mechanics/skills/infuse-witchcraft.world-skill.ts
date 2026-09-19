import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const infuseWitchcraft = {
  id: "01a06575-981e-71f2-aefe-f8c4a805782c",
  type: "page-type/world-skill",
  slug: "infuse-witchcraft",
  title: "Infuse Witchcraft",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
