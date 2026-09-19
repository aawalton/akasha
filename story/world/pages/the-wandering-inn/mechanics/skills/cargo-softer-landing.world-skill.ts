import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const cargoSofterLanding = {
  id: "01a06575-97fa-7f7b-9545-be06a9a75b1b",
  type: "page-type/world-skill",
  slug: "cargo-softer-landing",
  title: "Cargo: Softer Landing",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
