import { createDataFile } from "@akasha/utils-narrow/create-data-file"
import type { BuffOrDebuffTemplate } from "../buff-or-debuff-source/buff-or-debuff-source.module.code.ts"

interface DebuffOtherEffect {
  metricId: string
  effectType: string
  effectValue: number | { value: number; seconds: number }
}

interface DebuffOtherTemplate {
  id: string
  name: string
  description: string
  categoryId: "debuffs"
  subcategoryId: "other"
  effects: readonly DebuffOtherEffect[]
}

export const TEMPER_DEBUFF_OTHER_DATA = {
  "burning": {
    id: "burning" as const,
    name: "Burning",
    description: "Deals Flame Damage over time and applies Minor Breach",
    categoryId: "debuffs" as const,
    subcategoryId: "other" as const,
    effects: [
      {
        metricId: "target-physical-resistance" as const,
        effectType: "integer" as const,
        effectValue: -2974,
      },
      {
        metricId: "target-spell-resistance" as const,
        effectType: "integer" as const,
        effectValue: -2974,
      },
    ],
  },
  "cc-immunity": {
    id: "cc-immunity" as const,
    name: "CC Immunity",
    description: "Immune to crowd control effects",
    categoryId: "debuffs" as const,
    subcategoryId: "other" as const,
    effects: [],
  },
  "chilled": {
    id: "chilled" as const,
    name: "Chilled",
    description: "Applies Minor Maim, reducing damage done by 5%",
    categoryId: "debuffs" as const,
    subcategoryId: "other" as const,
    effects: [
      {
        metricId: "target-damage-done" as const,
        effectType: "fractional-change" as const,
        effectValue: -0.05,
      },
    ],
  },
  "concussed": {
    id: "concussed" as const,
    name: "Concussed",
    description: "Applies Minor Vulnerability, increasing damage taken by 5%",
    categoryId: "debuffs" as const,
    subcategoryId: "other" as const,
    effects: [
      {
        metricId: "target-damage-taken" as const,
        effectType: "fractional-change" as const,
        effectValue: 0.05,
      },
    ],
  },
  "diseased": {
    id: "diseased" as const,
    name: "Diseased",
    description: "Applies Minor Defile, reducing healing received and damage shield strength by 6%",
    categoryId: "debuffs" as const,
    subcategoryId: "other" as const,
    effects: [
      {
        metricId: "target-healing-received" as const,
        effectType: "fractional-change" as const,
        effectValue: -0.06,
      },
      {
        metricId: "target-health-recovery" as const,
        effectType: "fractional-change" as const,
        effectValue: -0.06,
      },
    ],
  },
  "disorient": {
    id: "disorient" as const,
    name: "Disorient",
    description: "Target is disoriented but effect breaks on damage",
    categoryId: "debuffs" as const,
    subcategoryId: "other" as const,
    effects: [],
  },
  "fear": {
    id: "fear" as const,
    name: "Fear",
    description: "Target flees in fear and cannot take actions",
    categoryId: "debuffs" as const,
    subcategoryId: "other" as const,
    effects: [],
  },
  "hemorrhaging": {
    id: "hemorrhaging" as const,
    name: "Hemorrhaging",
    description: "Deals Bleed Damage over time",
    categoryId: "debuffs" as const,
    subcategoryId: "other" as const,
    effects: [],
  },
  "immobilize": {
    id: "immobilize" as const,
    name: "Immobilize",
    description: "Target cannot move but can still attack",
    categoryId: "debuffs" as const,
    subcategoryId: "other" as const,
    effects: [],
  },
  "off-balance": {
    id: "off-balance" as const,
    name: "Off Balance",
    description: "Allows Heavy Attacks to restore double resources and stun (non-boss enemies)",
    categoryId: "debuffs" as const,
    subcategoryId: "other" as const,
    effects: [],
  },
  "overcharged": {
    id: "overcharged" as const,
    name: "Overcharged",
    description: "Applies Minor Magickasteal to enemies",
    categoryId: "debuffs" as const,
    subcategoryId: "other" as const,
    effects: [],
  },
  "poisoned": {
    id: "poisoned" as const,
    name: "Poisoned",
    description: "Deals Poison Damage over time and applies Minor Cowardice",
    categoryId: "debuffs" as const,
    subcategoryId: "other" as const,
    effects: [
      {
        metricId: "target-weapon-power" as const,
        effectType: "integer" as const,
        effectValue: -215,
      },
      {
        metricId: "target-spell-power" as const,
        effectType: "integer" as const,
        effectValue: -215,
      },
    ],
  },
  "silence": {
    id: "silence" as const,
    name: "Silence",
    description: "Target cannot cast abilities",
    categoryId: "debuffs" as const,
    subcategoryId: "other" as const,
    effects: [],
  },
  "stun": {
    id: "stun" as const,
    name: "Stun",
    description: "Target is stunned and cannot take actions",
    categoryId: "debuffs" as const,
    subcategoryId: "other" as const,
    effects: [],
  },
  "sundered": {
    id: "sundered" as const,
    name: "Sundered",
    description: "Applies Major Breach, reducing resistances",
    categoryId: "debuffs" as const,
    subcategoryId: "other" as const,
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
  "unstoppable": {
    id: "unstoppable" as const,
    name: "Unstoppable",
    description: "Immune to crowd control and snares",
    categoryId: "debuffs" as const,
    subcategoryId: "other" as const,
    effects: [],
  },
} satisfies Record<string, DebuffOtherTemplate>

export const debuffsOther = createDataFile<BuffOrDebuffTemplate>()(TEMPER_DEBUFF_OTHER_DATA)
