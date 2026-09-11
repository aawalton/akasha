import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const declareFoeBane = {
  id: "01a06575-9802-74cf-ba8c-ba026c1c3f2f",
  type: "world-skill",
  slug: "declare-foe-bane",
  title: "Declare Foe: Bane",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
