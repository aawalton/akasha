import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const deflectionShield = {
  id: "01a06575-9802-74ec-8780-2c9ca38adb8c",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "deflection-shield",
  title: "Deflection Shield",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
