import { createDataFile } from "@akasha/utils-narrow/create-data-file"
import type { BuffOrDebuffTemplate } from "../buff-or-debuff-source/buff-or-debuff-source.module.code.ts"

interface DebuffMajorEffect {
  metricId: string
  effectType: string
  effectValue: number | { value: number; seconds: number }
}

interface DebuffMajorTemplate {
  id: string
  name: string
  description: string
  categoryId: "debuffs"
  subcategoryId: "major"
  effects: readonly DebuffMajorEffect[]
}

export const TEMPER_DEBUFF_MAJOR_DATA = {
  "major-breach": {
    id: "major-breach" as const,
    name: "Major Breach",
    description: "Reduces Physical and Spell Resistance by 5948",
    categoryId: "debuffs" as const,
    subcategoryId: "major" as const,
    effects: [
      {
        metricId: "target-physical-resistance" as const,
        effectType: "integer" as const,
        effectValue: -5948,
      },
      {
        metricId: "target-spell-resistance" as const,
        effectType: "integer" as const,
        effectValue: -5948,
      },
    ],
  },
  "major-brittle": {
    id: "major-brittle" as const,
    name: "Major Brittle",
    description: "Increases Critical Damage taken by 20%",
    categoryId: "debuffs" as const,
    subcategoryId: "major" as const,
    effects: [
      {
        metricId: "target-critical-damage" as const,
        effectType: "fractional-change" as const,
        effectValue: 0.2,
      },
    ],
  },
  "major-cowardice": {
    id: "major-cowardice" as const,
    name: "Major Cowardice",
    description: "Reduces Weapon and Spell Damage by 430",
    categoryId: "debuffs" as const,
    subcategoryId: "major" as const,
    effects: [
      {
        metricId: "target-weapon-power" as const,
        effectType: "integer" as const,
        effectValue: -430,
      },
      {
        metricId: "target-spell-power" as const,
        effectType: "integer" as const,
        effectValue: -430,
      },
    ],
  },
  "major-defile": {
    id: "major-defile" as const,
    name: "Major Defile",
    description: "Reduces healing received and damage shield strength by 12%",
    categoryId: "debuffs" as const,
    subcategoryId: "major" as const,
    effects: [
      {
        metricId: "target-healing-received" as const,
        effectType: "fractional-change" as const,
        effectValue: -0.12,
      },
      {
        metricId: "target-health-recovery" as const,
        effectType: "fractional-change" as const,
        effectValue: -0.12,
      },
    ],
  },
  "major-enervation": {
    id: "major-enervation" as const,
    name: "Major Enervation",
    description: "Reduces Critical Damage done by 20%",
    categoryId: "debuffs" as const,
    subcategoryId: "major" as const,
    effects: [
      {
        metricId: "target-critical-damage-done" as const,
        effectType: "fractional-change" as const,
        effectValue: -0.2,
      },
    ],
  },
  "major-maim": {
    id: "major-maim" as const,
    name: "Major Maim",
    description: "Reduces damage done by 10%",
    categoryId: "debuffs" as const,
    subcategoryId: "major" as const,
    effects: [
      {
        metricId: "target-damage-done" as const,
        effectType: "fractional-change" as const,
        effectValue: -0.1,
      },
    ],
  },
  "major-vulnerability": {
    id: "major-vulnerability" as const,
    name: "Major Vulnerability",
    description: "Increases damage taken by 10%",
    categoryId: "debuffs" as const,
    subcategoryId: "major" as const,
    effects: [
      {
        metricId: "target-damage-taken" as const,
        effectType: "fractional-change" as const,
        effectValue: 0.1,
      },
    ],
  },
} satisfies Record<string, DebuffMajorTemplate>

export const debuffsMajor = createDataFile<BuffOrDebuffTemplate>()(TEMPER_DEBUFF_MAJOR_DATA)
