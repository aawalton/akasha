import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const goblinCookbook = {
  id: "01a06575-9815-796d-9eb9-66754e54c5a5",
  type: "page-type/world-skill",
  slug: "goblin-cookbook",
  title: "Goblin Cookbook",
  world: "world/the-wandering-inn",
} as const satisfies WorldSkill
