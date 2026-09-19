import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const leashTheSlave = {
  id: "01a06575-9822-76f6-8573-f5fdaf8e6ed5",
  type: "page-type/world-skill",
  slug: "leash-the-slave",
  title: "Leash the Slave",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
