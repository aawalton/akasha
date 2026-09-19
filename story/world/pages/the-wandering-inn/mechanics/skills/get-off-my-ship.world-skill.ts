import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const getOffMyShip = {
  id: "01a06575-9814-72cd-9b35-e29b095c6640",
  type: "page-type/world-skill",
  slug: "get-off-my-ship",
  title: "Get Off My Ship",
  world: "world/the-wandering-inn",
  aliases: ["Get off My Ship"],
  references: "jsonl",
} as const satisfies WorldSkill
