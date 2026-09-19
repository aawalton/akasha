import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const empoweredPuppets = {
  id: "01a06575-9808-74cf-8aca-857fca76b06c",
  type: "page-type/world-skill",
  slug: "empowered-puppets",
  title: "Empowered Puppets",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
