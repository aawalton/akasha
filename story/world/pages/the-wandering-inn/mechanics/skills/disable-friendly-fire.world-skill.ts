import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const disableFriendlyFire = {
  id: "01a06575-9803-7eb2-8530-61805b5f2c0e",
  type: "page-type/world-skill",
  slug: "disable-friendly-fire",
  title: "Disable Friendly Fire",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
