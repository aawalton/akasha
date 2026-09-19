import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const kithAndKinOfGoblins = {
  id: "01a06575-9821-7132-a38b-2b8024e26d42",
  type: "page-type/world-skill",
  slug: "kith-and-kin-of-goblins",
  title: "Kith and Kin of Goblins",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
