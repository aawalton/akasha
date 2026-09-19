import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const ghostSHand = {
  id: "01a06575-9814-7c1c-87dc-71c1023ce4c1",
  type: "page-type/world-skill",
  slug: "ghost-s-hand",
  title: "Ghost’s Hand",
  world: "world/the-wandering-inn",
  evolvesFromSlugs: ["royal-slap"],
  references: "jsonl",
} as const satisfies WorldSkill
