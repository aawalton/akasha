import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const hammerOfGod = {
  id: "01a06575-9818-798f-8d4e-3bb469b589f0",
  type: "page-type/world-skill",
  slug: "hammer-of-god",
  title: "Hammer of God",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
