import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const obeyMyWill = {
  id: "01a0657d-027b-7b9c-bdb1-a54a08ac243d",
  type: "world-skill",
  slug: "obey-my-will",
  title: "Obey My Will",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
