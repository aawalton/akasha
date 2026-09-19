import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const copyMagicalSeal = {
  id: "01a06575-97fd-7e61-9556-22ca79dc2c79",
  type: "page-type/world-skill",
  slug: "copy-magical-seal",
  title: "Copy Magical Seal",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
