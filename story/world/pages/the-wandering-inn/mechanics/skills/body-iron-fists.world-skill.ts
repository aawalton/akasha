import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const bodyIronFists = {
  id: "01a06575-97f6-796a-b063-c38c6730d8db",
  type: "page-type/world-skill",
  slug: "body-iron-fists",
  title: "Body: Iron Fists",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
