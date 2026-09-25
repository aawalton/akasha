import type { TemperTalismanGem } from "akasha/temper/catalog/gear/temper-talisman-gem/temper-talisman-gem.page-type.types.ts"

export const phynastersGemOfAgility = {
  id: "01a0d986-c59e-796a-bab3-19f944427528",
  type: "page-type/temper-talisman-gem",
  slug: "phynasters-gem-of-agility",
  title: "Phynaster's Gem of Agility",
  itemId: 225212,
  socketedInto: "temper-set/prowlers-talisman",
  gemSource:
    "A drop from the final chest of a Dynamic Encounter. From Update 51 that chest always drops it for a player who has the Folk Hero achievement, owns the talisman and has not yet got the gem.",
} as const satisfies TemperTalismanGem
