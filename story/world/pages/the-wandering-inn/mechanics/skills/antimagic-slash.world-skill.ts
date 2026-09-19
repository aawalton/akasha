import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const antimagicSlash = {
  id: "01a06575-97eb-781b-afd7-74280940f47b",
  type: "page-type/world-skill",
  slug: "antimagic-slash",
  title: "Antimagic Slash",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
