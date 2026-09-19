import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const unnoticedPresence = {
  id: "01a0657d-031f-771d-aed6-8c506f53c429",
  type: "page-type/world-skill",
  slug: "unnoticed-presence",
  title: "Unnoticed Presence",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
