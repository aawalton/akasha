import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const marchOfAnnihilation = {
  id: "01a0657d-0243-72ff-88a3-c262e666b59e",
  type: "page-type/world-skill",
  slug: "march-of-annihilation",
  title: "March of Annihilation",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
