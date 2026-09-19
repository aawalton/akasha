import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const adamantiumSGuard = {
  id: "01a06575-97e9-7fda-923c-49b494da20e9",
  type: "page-type/world-skill",
  slug: "adamantium-s-guard",
  title: "Adamantium’s Guard",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
