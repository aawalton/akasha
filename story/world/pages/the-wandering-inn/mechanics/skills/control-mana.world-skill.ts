import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const controlMana = {
  id: "01a06575-97fd-7721-8a66-5216b6191835",
  type: "page-type/world-skill",
  slug: "control-mana",
  title: "Control Mana",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
