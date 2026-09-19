import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const barrierArcaneSpellguard = {
  id: "01a06575-97f3-73f0-8344-f6986d9f21c0",
  type: "page-type/world-skill",
  slug: "barrier-arcane-spellguard",
  title: "Barrier: Arcane Spellguard",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
