import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const coatingOfAcid = {
  id: "01a06575-97fb-7bad-8f86-73d4e2ed0674",
  type: "page-type/world-skill",
  slug: "coating-of-acid",
  title: "Coating of Acid",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
