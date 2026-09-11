import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const doorOfPortals = {
  id: "01a06575-9804-7c86-987b-4e8f5b9db5dc",
  type: "world-skill",
  slug: "door-of-portals",
  title: "Door of Portals",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
