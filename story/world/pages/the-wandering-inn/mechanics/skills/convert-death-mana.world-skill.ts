import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const convertDeathMana = {
  id: "01a06575-97fd-7a61-b872-b3aeb4ad3ef1",
  type: "page-type/world-skill",
  slug: "convert-death-mana",
  title: "Convert Death Mana",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
