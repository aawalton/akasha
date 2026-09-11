import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const mendAllWounds = {
  id: "01a0657d-024c-729b-a1ad-8df5f615bec3",
  type: "world-skill",
  slug: "mend-all-wounds",
  title: "Mend All Wounds",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
