import type { WorldCondition } from "akasha/story/world/mechanics/conditions/world-condition.page-type.types.ts"

export const superSupportiveCorruptionWound = {
  id: "01a0e9f3-f5f5-7740-a612-c732dff5502f",
  type: "page-type/world-condition",
  slug: "super-supportive-corruption-wound",
  title: "Corruption damage",
  world: "world/super-supportive",
  aliases: ["chaos wound"],
  description:
    "Harm from chaos: silver streaks and blackened rot in flesh, or cracked, blackening skin.",
} as const satisfies WorldCondition
