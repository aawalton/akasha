import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const immobilizingTouch = {
  id: "01a06575-981c-7d89-986d-cae654d7c170",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "immobilizing-touch",
  title: "Immobilizing Touch",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
