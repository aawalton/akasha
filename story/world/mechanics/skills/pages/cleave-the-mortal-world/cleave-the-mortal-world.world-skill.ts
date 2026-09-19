import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const cleaveTheMortalWorld = {
  id: "01a06575-97fb-7ec1-b86f-cfeddbb291db",
  type: "page-type/world-skill",
  slug: "cleave-the-mortal-world",
  title: "Cleave the Mortal World",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
