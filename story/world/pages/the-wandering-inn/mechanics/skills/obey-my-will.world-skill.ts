import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const obeyMyWill = {
  id: "01a0657d-027b-7b9c-bdb1-a54a08ac243d",
  type: "page-type/world-skill",
  slug: "obey-my-will",
  title: "Obey My Will",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
