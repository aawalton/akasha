import type { PotionsTemplate } from "../potion-source/potion-source.module.code.ts"

export const POTIONS_DROPPED = {
  "essence-of-health": {
    id: "essence-of-health" as const,
    name: "Essence of Health",
    itemId: 27036,
    icon: "/esoui/art/icons/consumable_potion_001_type_005.dds",
    seconds: 22.1,
    level: "CP160",
    categoryId: "potions" as const,
    subcategoryId: "dropped" as const,
    description:
      "Restore 7352 Health immediately. Grants Major Fortitude which increases your Health Regeneration by 30% for 22.1 seconds.",
    effects: [
      {
        metricId: "health-restore" as const,
        effectType: "number-per-seconds" as const,
        effectValue: { value: 6684, seconds: 45 },
      },
      { buffId: "major-fortitude", seconds: 22.1 },
    ],
  },
  "essence-of-magicka": {
    id: "essence-of-magicka" as const,
    name: "Essence of Magicka",
    itemId: 27037,
    icon: "/esoui/art/icons/consumable_potion_002_type_005.dds",
    seconds: 22.1,
    level: "CP160",
    categoryId: "potions" as const,
    subcategoryId: "dropped" as const,
    description:
      "Restore 6066 Magicka immediately. Grants Major Intellect which increases your Magicka Regeneration by 30% for 22.1 seconds.",
    effects: [
      {
        metricId: "magicka-restore" as const,
        effectType: "number-per-seconds" as const,
        effectValue: { value: 6066, seconds: 45 },
      },
      { buffId: "major-intellect", seconds: 22.1 },
    ],
  },
  "essence-of-stamina": {
    id: "essence-of-stamina" as const,
    name: "Essence of Stamina",
    itemId: 27038,
    icon: "/esoui/art/icons/consumable_potion_003_type_005.dds",
    seconds: 22.1,
    level: "CP160",
    categoryId: "potions" as const,
    subcategoryId: "dropped" as const,
    description:
      "Restore 6066 Stamina immediately. Grants Major Endurance which increases your Stamina Regeneration by 30% for 22.1 seconds.",
    effects: [
      {
        metricId: "stamina-restore" as const,
        effectType: "number-per-seconds" as const,
        effectValue: { value: 6066, seconds: 45 },
      },
      { buffId: "major-endurance", seconds: 22.1 },
    ],
  },
  "essence-of-potent-health": {
    id: "essence-of-potent-health" as const,
    name: "Essence of Potent Health",
    itemId: 176041,
    icon: "/esoui/art/icons/consumable_potion_001_type_005.dds",
    seconds: 22.1,
    level: "CP160",
    categoryId: "potions" as const,
    subcategoryId: "dropped" as const,
    description:
      "Restore 7352 Health immediately. Grants Major Fortitude which increases your Health Regeneration by 30% for 22.1 seconds. Restore 6066 Magicka immediately. Grants Major Intellect which increases your Magicka Regeneration by 30% for 22.1 seconds.",
    effects: [
      {
        metricId: "health-restore" as const,
        effectType: "number-per-seconds" as const,
        effectValue: { value: 6684, seconds: 45 },
      },
      {
        metricId: "magicka-restore" as const,
        effectType: "number-per-seconds" as const,
        effectValue: { value: 6066, seconds: 45 },
      },
      { buffId: "major-fortitude", seconds: 22.1 },
      { buffId: "major-intellect", seconds: 22.1 },
    ],
  },
  "essence-of-potent-magicka": {
    id: "essence-of-potent-magicka" as const,
    name: "Essence of Potent Magicka",
    itemId: 176040,
    icon: "/esoui/art/icons/consumable_potion_002_type_005.dds",
    seconds: 22.1,
    level: "CP160",
    categoryId: "potions" as const,
    subcategoryId: "dropped" as const,
    description:
      "Grants Major Sorcery which increases your Spell Damage by 20% for 22.1 seconds. Restore 6066 Magicka immediately. Grants Major Intellect which increases your Magicka Regeneration by 30% for 22.1 seconds.",
    effects: [
      {
        metricId: "magicka-restore" as const,
        effectType: "number-per-seconds" as const,
        effectValue: { value: 6066, seconds: 45 },
      },
      { buffId: "major-intellect", seconds: 22.1 },
      { buffId: "major-sorcery", seconds: 22.1 },
    ],
  },
  "essence-of-potent-stamina": {
    id: "essence-of-potent-stamina" as const,
    name: "Essence of Potent Stamina",
    itemId: 176042,
    icon: "/esoui/art/icons/consumable_potion_003_type_005.dds",
    seconds: 22.1,
    level: "CP160",
    categoryId: "potions" as const,
    subcategoryId: "dropped" as const,
    description:
      "Grants Major Brutality which increases your Weapon Damage by 20% for 22.1 seconds. Restore 6066 Stamina immediately. Grants Major Endurance which increases your Stamina Regeneration by 30% for 22.1 seconds.",
    effects: [
      {
        metricId: "stamina-restore" as const,
        effectType: "number-per-seconds" as const,
        effectValue: { value: 6066, seconds: 45 },
      },
      { buffId: "major-endurance", seconds: 22.1 },
      { buffId: "major-brutality", seconds: 22.1 },
    ],
  },
} satisfies Record<string, PotionsTemplate>
