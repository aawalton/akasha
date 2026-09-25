import type { TemperTalismanGem } from "akasha/temper/catalog/gear/temper-talisman-gem/temper-talisman-gem.page-type.types.ts"

export const phynastersGemOfDeception = {
  id: "01a0d986-c59f-7820-bfdd-d5a6bb17347b",
  type: "page-type/temper-talisman-gem",
  slug: "phynasters-gem-of-deception",
  title: "Phynaster's Gem of Deception",
  itemId: 225213,
  socketedInto: "temper-set/prowlers-talisman",
  gemSource:
    "A reward for solving a Rumor. Tilli the Gossip on the Southern Docks of Daggerfall starts Rumors with the quest Rumors Abound, which the Crown Store also gives free. Players report the gem from her first Rumor, The Beriel Heirloom.",
} as const satisfies TemperTalismanGem
