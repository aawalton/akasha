import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const iFoughtAgainstFiveAlone = {
  id: "01a06575-981b-78a3-b882-92023ab35c91",
  type: "page-type/world-skill",
  slug: "i-fought-against-five-alone",
  title: "I Fought Against Five Alone",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
