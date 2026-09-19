import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const knightSChallenge = {
  id: "01a06575-9821-72eb-bfbc-0af70b90e8b4",
  type: "page-type/world-skill",
  slug: "knight-s-challenge",
  title: "Knight’s Challenge",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
