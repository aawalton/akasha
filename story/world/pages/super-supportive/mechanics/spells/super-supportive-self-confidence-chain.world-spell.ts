import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const superSupportiveSelfConfidenceChain = {
  id: "01a0e9f7-9e6e-7bc8-942e-5156a4e17413",
  type: "page-type/world-spell",
  slug: "super-supportive-self-confidence-chain",
  title: "self-confidence wordchain",
  world: "world/super-supportive",
  aliases: ["self-confidence chain"],
  description: "A wordchain that raises self-confidence.",
} as const satisfies WorldSpell
