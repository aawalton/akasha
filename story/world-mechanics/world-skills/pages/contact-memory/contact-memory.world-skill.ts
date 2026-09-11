import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const contactMemory = {
  id: "01a06575-97fd-7654-9fd3-4733486a20a2",
  type: "world-skill",
  slug: "contact-memory",
  title: "Contact Memory",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
