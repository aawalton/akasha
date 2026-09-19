import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const lifeshardAmmunition = {
  id: "01a0657d-023a-70ed-9666-98626b620758",
  type: "page-type/world-skill",
  slug: "lifeshard-ammunition",
  title: "Lifeshard Ammunition",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
