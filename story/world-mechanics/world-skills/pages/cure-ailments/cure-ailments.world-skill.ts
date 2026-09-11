import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const cureAilments = {
  id: "01a06575-97ff-78fc-82c4-bd9ca6edf274",
  type: "world-skill",
  slug: "cure-ailments",
  title: "Cure Ailments",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
