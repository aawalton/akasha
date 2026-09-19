import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const kingslayerShells = {
  id: "01a06575-9821-7d73-8169-d6e26169f5cc",
  type: "page-type/world-skill",
  slug: "kingslayer-shells",
  title: "Kingslayer Shells",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
