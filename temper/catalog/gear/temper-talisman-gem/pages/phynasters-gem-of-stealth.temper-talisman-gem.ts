import type { TemperTalismanGem } from "akasha/temper/catalog/gear/temper-talisman-gem/temper-talisman-gem.page-type.types.ts"

export const phynastersGemOfStealth = {
  id: "01a0d986-c5a0-7b30-a7fe-9c0015e14ff9",
  type: "page-type/temper-talisman-gem",
  slug: "phynasters-gem-of-stealth",
  title: "Phynaster's Gem of Stealth",
  itemId: 225211,
  socketedInto: "temper-set/prowlers-talisman",
  gemSource:
    "The reward for the Thieves Guild quest Racing Into Nowhere, which follows The Codex Caper and The Nowhere Keys. Skeever Nivo starts it by sending you to Quen in the Thieves Den of the Daggerfall Outlaws Refuge in Glenumbra.",
} as const satisfies TemperTalismanGem
