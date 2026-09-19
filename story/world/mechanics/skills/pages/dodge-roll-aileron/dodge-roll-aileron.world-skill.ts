import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const dodgeRollAileron = {
  id: "01a06575-9804-7b66-9fdb-ff1438093a82",
  type: "page-type/world-skill",
  slug: "dodge-roll-aileron",
  title: "Dodge Roll (Aileron)",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
