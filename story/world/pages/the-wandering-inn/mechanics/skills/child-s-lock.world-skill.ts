import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const childSLock = {
  id: "01a06575-97fb-785f-ba5c-ce3cecb8472e",
  type: "page-type/world-skill",
  slug: "child-s-lock",
  title: "Child’s Lock",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
