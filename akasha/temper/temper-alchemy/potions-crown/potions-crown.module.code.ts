import type { PotionsTemplate } from "../potion-source/potion-source.module.code.ts"

export const POTIONS_CROWN = {
  "crown-tri-restoration-potion": {
    id: "crown-tri-restoration-potion" as const,
    name: "Crown Tri-Restoration Potion",
    itemId: 64710,
    icon: "/esoui/art/icons/crownpotion_trires.dds",
    seconds: 36.3,
    level: "Scaled",
    categoryId: "potions" as const,
    subcategoryId: "crown" as const,
    description:
      "Restore 9206 Health, 7582 Magicka, and 7582 Stamina immediately. Grants Major Fortitude, Major Intellect, and Major Endurance which increase your Health Recovery, Magicka Recovery, and Stamina Recovery by 30% for 36.3 seconds.",
    effects: [
      {
        metricId: "health-restore",
        effectType: "number-per-seconds",
        effectValue: { value: 8369, seconds: 45 },
      },
      {
        metricId: "magicka-restore",
        effectType: "number-per-seconds",
        effectValue: { value: 7582, seconds: 45 },
      },
      {
        metricId: "stamina-restore",
        effectType: "number-per-seconds",
        effectValue: { value: 7582, seconds: 45 },
      },
      { buffId: "major-fortitude", seconds: 36.3 },
      { buffId: "major-intellect", seconds: 36.3 },
      { buffId: "major-endurance", seconds: 36.3 },
    ],
  },
  "gold-coast-spellcaster-elixir": {
    id: "gold-coast-spellcaster-elixir" as const,
    name: "Gold Coast Spellcaster Elixir",
    itemId: 112427,
    icon: "/esoui/art/icons/crownpotion_spellcaster.dds",
    seconds: 36.3,
    level: "Scaled",
    categoryId: "potions" as const,
    subcategoryId: "crown" as const,
    description:
      "Restore 7582 Magicka immediately. Grants Major Intellect which increases your Magicka Recovery by 30% for 36.3 seconds. Also grants Major Sorcery and Major Prophecy, increasing your Spell Damage by 20% and Spell Critical by 2629 for 36.3 seconds.",
    effects: [
      {
        metricId: "magicka-restore",
        effectType: "number-per-seconds",
        effectValue: { value: 7582, seconds: 45 },
      },
      { buffId: "major-intellect", seconds: 36.3 },
      { buffId: "major-sorcery", seconds: 36.3 },
      { buffId: "major-prophecy", seconds: 36.3 },
    ],
  },
  "gold-coast-warrior-elixir": {
    id: "gold-coast-warrior-elixir" as const,
    name: "Gold Coast Warrior Elixir",
    itemId: 112428,
    icon: "/esoui/art/icons/crownpotion_warrior.dds",
    seconds: 36.3,
    level: "Scaled",
    categoryId: "potions" as const,
    subcategoryId: "crown" as const,
    description:
      "Restore 7582 Stamina immediately. Grants Major Endurance which increases your Stamina Recovery by 30% for 36.3 seconds. Also grants Major Brutality and Major Savagery, increasing your Weapon Damage by 20% and Weapon Critical by 2629 for 36.3 seconds.",
    effects: [
      {
        metricId: "stamina-restore",
        effectType: "number-per-seconds",
        effectValue: { value: 7582, seconds: 45 },
      },
      { buffId: "major-endurance", seconds: 36.3 },
      { buffId: "major-brutality", seconds: 36.3 },
      { buffId: "major-savagery", seconds: 36.3 },
    ],
  },
  "gold-coast-swift-survivor-elixir": {
    id: "gold-coast-swift-survivor-elixir" as const,
    name: "Gold Coast Swift Survivor Elixir",
    itemId: 124674,
    icon: "/esoui/art/icons/crownpotion_speed.dds",
    seconds: 36.3,
    level: "Scaled",
    categoryId: "potions" as const,
    subcategoryId: "crown" as const,
    description:
      "Restore 8536 Health immediately. Grants Major Fortitude and Major Expedition, increasing your Health Recovery by 30% for 36.3 seconds, and Movement Speed by 30% for 10.5 seconds. Also grants Unstoppable for 8 seconds, granting you immunity to knockback and disabling effects.",
    effects: [
      {
        metricId: "health-restore",
        effectType: "number-per-seconds",
        effectValue: { value: 8369, seconds: 45 },
      },
      { buffId: "major-fortitude", seconds: 36.3 },
      { buffId: "major-expedition", seconds: 10.5 },
    ],
  },
} satisfies Record<string, PotionsTemplate>
