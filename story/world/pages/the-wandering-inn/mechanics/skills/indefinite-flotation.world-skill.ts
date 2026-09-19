import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const indefiniteFlotation = {
  id: "01a06575-981e-7db0-8612-9d019009b6f2",
  type: "page-type/world-skill",
  slug: "indefinite-flotation",
  title: "Indefinite Flotation",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
