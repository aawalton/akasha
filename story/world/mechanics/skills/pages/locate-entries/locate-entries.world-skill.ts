import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const locateEntries = {
  id: "01a0657d-0240-7dd5-876e-efa598a371d6",
  type: "page-type/world-skill",
  slug: "locate-entries",
  title: "Locate Entries",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
