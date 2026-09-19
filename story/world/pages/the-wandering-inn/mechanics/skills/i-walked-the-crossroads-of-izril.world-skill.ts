import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const iWalkedTheCrossroadsOfIzril = {
  id: "01a06575-981c-765b-8803-e1ceb3314650",
  type: "page-type/world-skill",
  slug: "i-walked-the-crossroads-of-izril",
  title: "I Walked the Crossroads of Izril",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
