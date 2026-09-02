import { createDataFile } from "@akasha/utils-narrow/create-data-file"
import type { BuffOrDebuffTemplate } from "../buff-or-debuff-source/buff-or-debuff-source.module.code.ts"

interface BuffMajorEffect {
  metricId: string
  effectType: string
  effectValue: number | { value: number; seconds: number }
}

interface BuffMajorTemplate {
  id: string
  name: string
  description: string
  categoryId: "buffs"
  subcategoryId: "major"
  effects: readonly BuffMajorEffect[]
}

export const TEMPER_BUFF_MAJOR_DATA = {
  "major-aegis": {
    id: "major-aegis" as const,
    name: "Major Aegis",
    description: "Reduces damage taken from Dungeon, Trial, and Arena monsters by 10%",
    categoryId: "buffs" as const,
    subcategoryId: "major" as const,
    effects: [
      {
        metricId: "damage-taken-dungeon" as const,
        effectType: "fractional-change" as const,
        effectValue: -0.1,
      },
      {
        metricId: "damage-taken-trial" as const,
        effectType: "fractional-change" as const,
        effectValue: -0.1,
      },
      {
        metricId: "damage-taken-arena" as const,
        effectType: "fractional-change" as const,
        effectValue: -0.1,
      },
    ],
  },
  "major-berserk": {
    id: "major-berserk" as const,
    name: "Major Berserk",
    description: "Increases damage done by 10%",
    categoryId: "buffs" as const,
    subcategoryId: "major" as const,
    effects: [
      {
        metricId: "damage-done-base" as const,
        effectType: "fractional-change" as const,
        effectValue: 0.1,
      },
    ],
  },
  "major-brutality": {
    id: "major-brutality" as const,
    name: "Major Brutality",
    description: "Increases Weapon Damage by 20%",
    categoryId: "buffs" as const,
    subcategoryId: "major" as const,
    effects: [
      {
        metricId: "power-weapon" as const,
        effectType: "fractional-change" as const,
        effectValue: 0.2,
      },
    ],
  },
  "major-courage": {
    id: "major-courage" as const,
    name: "Major Courage",
    description: "Increases Weapon and Spell Damage by 430",
    categoryId: "buffs" as const,
    subcategoryId: "major" as const,
    effects: [{ metricId: "power" as const, effectType: "integer" as const, effectValue: 430 }],
  },
  "major-endurance": {
    id: "major-endurance" as const,
    name: "Major Endurance",
    description: "Increases Stamina Recovery by 30%",
    categoryId: "buffs" as const,
    subcategoryId: "major" as const,
    effects: [
      {
        metricId: "stamina-recovery" as const,
        effectType: "fractional-change" as const,
        effectValue: 0.3,
      },
    ],
  },
  "major-evasion": {
    id: "major-evasion" as const,
    name: "Major Evasion",
    description: "Reduces damage from area attacks by 20%",
    categoryId: "buffs" as const,
    subcategoryId: "major" as const,
    effects: [
      {
        metricId: "damage-taken-from-area" as const,
        effectType: "fractional-change" as const,
        effectValue: -0.2,
      },
    ],
  },
  "major-expedition": {
    id: "major-expedition" as const,
    name: "Major Expedition",
    description: "Increases movement speed by 30%",
    categoryId: "buffs" as const,
    subcategoryId: "major" as const,
    effects: [
      {
        metricId: "movement-speed" as const,
        effectType: "fractional-change" as const,
        effectValue: 0.3,
      },
    ],
  },
  "major-force": {
    id: "major-force" as const,
    name: "Major Force",
    description: "Increases Critical Damage by 20%",
    categoryId: "buffs" as const,
    subcategoryId: "major" as const,
    effects: [
      {
        metricId: "critical-damage" as const,
        effectType: "fractional-change" as const,
        effectValue: 0.2,
      },
    ],
  },
  "major-fortitude": {
    id: "major-fortitude" as const,
    name: "Major Fortitude",
    description: "Increases Health Recovery by 30%",
    categoryId: "buffs" as const,
    subcategoryId: "major" as const,
    effects: [
      {
        metricId: "health-recovery" as const,
        effectType: "fractional-change" as const,
        effectValue: 0.3,
      },
    ],
  },
  "major-gallop": {
    id: "major-gallop" as const,
    name: "Major Gallop",
    description: "Increases mounted speed by 30%",
    categoryId: "buffs" as const,
    subcategoryId: "major" as const,
    effects: [
      {
        metricId: "movement-run-speed" as const,
        effectType: "fractional-change" as const,
        effectValue: 0.3,
      },
    ],
  },
  "major-heroism": {
    id: "major-heroism" as const,
    name: "Major Heroism",
    description: "Grants 3 Ultimate every 1.5 seconds",
    categoryId: "buffs" as const,
    subcategoryId: "major" as const,
    effects: [
      {
        metricId: "ultimate-recovery" as const,
        effectType: "number-per-seconds" as const,
        effectValue: { value: 3, seconds: 1.5 },
      },
    ],
  },
  "major-intellect": {
    id: "major-intellect" as const,
    name: "Major Intellect",
    description: "Increases Magicka Recovery by 30%",
    categoryId: "buffs" as const,
    subcategoryId: "major" as const,
    effects: [
      {
        metricId: "magicka-recovery" as const,
        effectType: "fractional-change" as const,
        effectValue: 0.3,
      },
    ],
  },
  "major-mending": {
    id: "major-mending" as const,
    name: "Major Mending",
    description: "Increases healing done by 16%",
    categoryId: "buffs" as const,
    subcategoryId: "major" as const,
    effects: [
      {
        metricId: "healing-done-base" as const,
        effectType: "fractional-change" as const,
        effectValue: 0.16,
      },
    ],
  },
  "major-prophecy": {
    id: "major-prophecy" as const,
    name: "Major Prophecy",
    description: "Increases Spell Critical by 2629",
    categoryId: "buffs" as const,
    subcategoryId: "major" as const,
    effects: [
      {
        metricId: "critical-rating-spell" as const,
        effectType: "integer" as const,
        effectValue: 2629,
      },
    ],
  },
  "major-protection": {
    id: "major-protection" as const,
    name: "Major Protection",
    description: "Reduces damage taken by 10%",
    categoryId: "buffs" as const,
    subcategoryId: "major" as const,
    effects: [
      {
        metricId: "damage-taken" as const,
        effectType: "fractional-change" as const,
        effectValue: -0.1,
      },
    ],
  },
  "major-resolve": {
    id: "major-resolve" as const,
    name: "Major Resolve",
    description: "Increases Physical and Spell Resistance by 5948",
    categoryId: "buffs" as const,
    subcategoryId: "major" as const,
    effects: [
      { metricId: "resistance" as const, effectType: "integer" as const, effectValue: 5948 },
    ],
  },
  "major-savagery": {
    id: "major-savagery" as const,
    name: "Major Savagery",
    description: "Increases Weapon Critical by 2629",
    categoryId: "buffs" as const,
    subcategoryId: "major" as const,
    effects: [
      {
        metricId: "critical-rating-weapon" as const,
        effectType: "integer" as const,
        effectValue: 2629,
      },
    ],
  },
  "major-slayer": {
    id: "major-slayer" as const,
    name: "Major Slayer",
    description: "Increases damage done to Dungeon, Trial, and Arena monsters by 10%",
    categoryId: "buffs" as const,
    subcategoryId: "major" as const,
    effects: [
      {
        metricId: "damage-done-dungeon" as const,
        effectType: "fractional-change" as const,
        effectValue: 0.1,
      },
      {
        metricId: "damage-done-trial" as const,
        effectType: "fractional-change" as const,
        effectValue: 0.1,
      },
      {
        metricId: "damage-done-arena" as const,
        effectType: "fractional-change" as const,
        effectValue: 0.1,
      },
    ],
  },
  "major-sorcery": {
    id: "major-sorcery" as const,
    name: "Major Sorcery",
    description: "Increases Spell Damage by 20%",
    categoryId: "buffs" as const,
    subcategoryId: "major" as const,
    effects: [
      {
        metricId: "power-spell" as const,
        effectType: "fractional-change" as const,
        effectValue: 0.2,
      },
    ],
  },
  "major-vitality": {
    id: "major-vitality" as const,
    name: "Major Vitality",
    description: "Increases healing received and damage shield strength by 12%",
    categoryId: "buffs" as const,
    subcategoryId: "major" as const,
    effects: [
      {
        metricId: "healing-received-base" as const,
        effectType: "fractional-change" as const,
        effectValue: 0.12,
      },
    ],
  },
} satisfies Record<string, BuffMajorTemplate>

export const buffsMajor = createDataFile<BuffOrDebuffTemplate>()(TEMPER_BUFF_MAJOR_DATA)
