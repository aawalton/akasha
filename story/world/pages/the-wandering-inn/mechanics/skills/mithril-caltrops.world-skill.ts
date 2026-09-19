import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const mithrilCaltrops = {
  id: "01a0657d-026f-7e47-8905-f3338eb7f2cb",
  type: "page-type/world-skill",
  slug: "mithril-caltrops",
  title: "Mithril Caltrops",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
