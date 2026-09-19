import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const championsOfTheBrassDragon = {
  id: "01a06575-97fa-7817-b513-6dfe611c04be",
  type: "page-type/world-skill",
  slug: "champions-of-the-brass-dragon",
  title: "Champions of the Brass Dragon",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
