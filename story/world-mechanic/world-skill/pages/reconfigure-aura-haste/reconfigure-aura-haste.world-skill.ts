import type { WorldSkill } from "akasha/story/world-mechanic/world-skill/world-skill.page-type.types.ts"

export const reconfigureAuraHaste = {
  id: "01a0657d-02a6-7d95-ace6-d3b27221e79d",
  type: "world-skill",
  slug: "reconfigure-aura-haste",
  title: "Reconfigure Aura: Haste",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
