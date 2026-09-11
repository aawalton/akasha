import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const automaticAiming = {
  id: "01a06575-97f0-7e12-b5e0-fa160afce159",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "automatic-aiming",
  title: "Automatic Aiming",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
