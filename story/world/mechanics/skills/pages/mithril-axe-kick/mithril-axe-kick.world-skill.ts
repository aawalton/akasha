import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const mithrilAxeKick = {
  id: "01a0657d-026f-707f-8755-29051a1469b3",
  type: "page-type/world-skill",
  slug: "mithril-axe-kick",
  title: "Mithril Axe Kick",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
