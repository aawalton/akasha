import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const auraReader = {
  id: "01a06575-97f0-7e41-9e81-794ce8ca0245",
  type: "world-skill",
  slug: "aura-reader",
  title: "Aura Reader",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
