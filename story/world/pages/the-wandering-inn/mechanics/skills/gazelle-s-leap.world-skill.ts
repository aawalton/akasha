import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const gazelleSLeap = {
  id: "01a06575-9814-79b8-83ce-bccd1f27a3bd",
  type: "page-type/world-skill",
  slug: "gazelle-s-leap",
  title: "Gazelle’s Leap",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
