import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const axeKick = {
  id: "01a06575-97f2-7f67-bd87-5fd939a69779",
  type: "page-type/world-skill",
  slug: "axe-kick",
  title: "Axe Kick",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
