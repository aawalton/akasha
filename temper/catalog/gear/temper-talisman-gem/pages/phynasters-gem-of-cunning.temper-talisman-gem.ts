import type { TemperTalismanGem } from "akasha/temper/catalog/gear/temper-talisman-gem/temper-talisman-gem.page-type.types.ts"

export const phynastersGemOfCunning = {
  id: "01a0d986-c59f-7d4b-9caa-2237aecb8ea5",
  type: "page-type/temper-talisman-gem",
  slug: "phynasters-gem-of-cunning",
  title: "Phynaster's Gem of Cunning",
  itemId: 225214,
  socketedInto: "temper-set/prowlers-talisman",
  gemSource:
    "A drop from a chest in the Nowhere Vault, entered from the Thieves Den in Daggerfall with Wondrous Nowhere Keys. Six keys open all three wings and nine clear every challenge room. Favor quests are the sure source of keys.",
} as const satisfies TemperTalismanGem
