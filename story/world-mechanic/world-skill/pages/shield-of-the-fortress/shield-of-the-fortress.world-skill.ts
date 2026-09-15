import type { WorldSkill } from "akasha/story/world-mechanic/world-skill/world-skill.page-type.types.ts"

export const shieldOfTheFortress = {
  id: "01a0657d-02c0-7ab0-9edb-e52e82c95ea5",
  type: "world-skill",
  slug: "shield-of-the-fortress",
  title: "Shield of the Fortress",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
