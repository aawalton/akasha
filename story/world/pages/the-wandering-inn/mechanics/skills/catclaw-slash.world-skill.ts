import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const catclawSlash = {
  id: "01a06575-97fa-76ed-b947-e6c2785cc7ec",
  type: "page-type/world-skill",
  slug: "catclaw-slash",
  title: "Catclaw Slash",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
