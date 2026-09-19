import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const invisibleBolt = {
  id: "01a06575-9820-7501-93b1-ca0715af6095",
  type: "page-type/world-skill",
  slug: "invisible-bolt",
  title: "Invisible Bolt",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
