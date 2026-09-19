import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const harvestCraftLocal = {
  id: "01a06575-9818-7435-bebd-52e4fbf11e48",
  type: "page-type/world-skill",
  slug: "harvest-craft-local",
  title: "Harvest Craft (Local)",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
