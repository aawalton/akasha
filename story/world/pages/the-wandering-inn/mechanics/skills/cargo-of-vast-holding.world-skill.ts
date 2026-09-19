import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const cargoOfVastHolding = {
  id: "01a06575-97fa-7627-99aa-fd4718a3b47a",
  type: "page-type/world-skill",
  slug: "cargo-of-vast-holding",
  title: "Cargo of Vast Holding",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
