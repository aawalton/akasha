import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const concealPresence = {
  id: "01a06575-97fc-76cf-9768-a5c2e35908b5",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "conceal-presence",
  title: "Conceal Presence",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
