import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const guildSpidergripMobility = {
  id: "01a06575-9817-7a4d-805e-fa6437bbd196",
  type: "page-type/world-skill",
  slug: "guild-spidergrip-mobility",
  title: "Guild: Spidergrip Mobility",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
