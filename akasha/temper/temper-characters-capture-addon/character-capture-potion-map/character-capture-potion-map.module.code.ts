import "@akasha/temper-eso-types/tstl-eso-sandbox"
export const POTION_ITEM_ID_TO_INDEX: Record<number, number> = {
  [64710]: 1,
  [112427]: 2,
  [112428]: 3,
  [124674]: 4,
  [27036]: 5,
  [27037]: 6,
  [27038]: 7,
  [176041]: 8,
  [176040]: 9,
  [176042]: 10,
}
export const POTION_ITEM_ID_TO_TEMPER_ID: Record<number, string> = {
  [64710]: "crown-tri-restoration-potion",
  [112427]: "gold-coast-spellcaster-elixir",
  [112428]: "gold-coast-warrior-elixir",
  [124674]: "gold-coast-swift-survivor-elixir",
  [27036]: "essence-of-health",
  [27037]: "essence-of-magicka",
  [27038]: "essence-of-stamina",
  [176041]: "essence-of-potent-health",
  [176040]: "essence-of-potent-magicka",
  [176042]: "essence-of-potent-stamina",
}
export const POTION_ENCODED_TRAITS_TO_INDEX: Record<number, number> = {
  [8849689]: 11,
  [8456477]: 12,
  [8984861]: 13,
  [9772288]: 14,
  [8455433]: 15,
  [9902363]: 16,
  [8454917]: 17,
  [8586519]: 18,
  [8722207]: 19,
  [8722203]: 20,
  [8719639]: 21,
  [8719633]: 22,
  [8459805]: 23,
  [8458006]: 24,
  [8454919]: 25,
  [8587029]: 26,
  [8454927]: 27,
  [8455945]: 28,
  [8587033]: 29,
  [10165535]: 30,
  [8586517]: 31,
  [8588053]: 32,
  [8720661]: 33,
  [8586527]: 34,
  [8455441]: 35,
  [8588047]: 36,
  [8458001]: 37,
  [9837343]: 38,
  [9836319]: 39,
  [9903391]: 40,
  [9836317]: 41,
  [9902879]: 42,
  [8589079]: 43,
  [8591129]: 44,
  [9836315]: 45,
}
export const POTION_ENCODED_TRAITS_TO_TEMPER_ID: Record<number, string> = {
  [8849689]: "protection-resistance-physical-resistance-spell",
  [8456477]: "fortitude-vitality-health-restore-resistance-physical",
  [8984861]: "vitality-protection-resistance-physical",
  [9772288]: "vitality-stealth-detection",
  [8455433]: "endurance-fortitude-health-restore-resistance-physical-stamina-restore",
  [9902363]: "expedition-vitality-protection-health-restore",
  [8454917]: "endurance-fortitude-intellect-health-restore-magicka-restore-stamina-restore",
  [8586519]: "endurance-expedition-intellect-magicka-restore-stamina-restore",
  [8722207]: "endurance-expedition-heroism-stamina-restore",
  [8722203]: "endurance-expedition-health-restore-stamina-restore",
  [8719639]: "brutality-endurance-expedition-stamina-restore",
  [8719633]: "brutality-endurance-savagery-stamina-restore",
  [8459805]: "fortitude-vitality-vanish-health-restore",
  [8458006]: "fortitude-prophecy-vanish-health-restore",
  [8454919]: "fortitude-intellect-health-restore-magicka-restore-resistance-spell",
  [8587029]: "intellect-magicka-restore-resistance-spell-stealth-detection",
  [8454927]: "fortitude-intellect-prophecy-health-restore-magicka-restore",
  [8455945]: "fortitude-health-restore-resistance-physical-resistance-spell",
  [8587033]: "intellect-protection-magicka-restore-resistance-spell",
  [10165535]: "vitality-heroism-health-restore",
  [8586517]: "endurance-intellect-magicka-restore-stamina-restore-stealth-detection",
  [8588053]: "intellect-sorcery-magicka-restore-stealth-detection",
  [8720661]: "endurance-savagery-stamina-restore-stealth-detection",
  [8586527]: "endurance-intellect-heroism-magicka-restore-stamina-restore",
  [8455441]: "endurance-fortitude-savagery-health-restore-stamina-restore",
  [8588047]: "intellect-prophecy-sorcery-magicka-restore",
  [8458001]: "fortitude-prophecy-savagery-health-restore",
  [9837343]: "heroism-vanish-health-restore",
  [9836319]: "expedition-heroism-vanish",
  [9903391]: "expedition-vitality-heroism",
  [9836317]: "expedition-vitality-vanish",
  [9902879]: "expedition-heroism-health-restore",
  [8589079]: "expedition-intellect-prophecy-magicka-restore",
  [8591129]: "expedition-intellect-protection-magicka-restore",
  [9836315]: "expedition-vanish-health-restore",
}
export function parsePotionData(itemLink: string): number {
  const [potionData] = string.match(itemLink, ":(%d+)|h")
  if (potionData !== undefined) {
    return tonumber(potionData) ?? 0
  }
  return 0
}
export function getPotionIndex(itemId: number, encodedTraits: number): number {
  if (encodedTraits !== 0) {
    return POTION_ENCODED_TRAITS_TO_INDEX[encodedTraits] ?? 0
  }
  return POTION_ITEM_ID_TO_INDEX[itemId] ?? 0
}
export function getPotionTemperId(itemId: number, encodedTraits: number): string {
  if (encodedTraits !== 0) {
    return POTION_ENCODED_TRAITS_TO_TEMPER_ID[encodedTraits] ?? "no-potion"
  }
  return POTION_ITEM_ID_TO_TEMPER_ID[itemId] ?? "no-potion"
}
