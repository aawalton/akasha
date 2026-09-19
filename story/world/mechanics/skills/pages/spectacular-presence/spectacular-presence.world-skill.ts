import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const spectacularPresence = {
  id: "01a0657d-02ed-7cd7-9793-62fcc4bba676",
  type: "page-type/world-skill",
  slug: "spectacular-presence",
  title: "Spectacular Presence",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
