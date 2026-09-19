import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const pathToVictory = {
  id: "01a0657d-028d-75f7-b839-143b4a2213d0",
  type: "page-type/world-skill",
  slug: "path-to-victory",
  title: "Path to Victory",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
