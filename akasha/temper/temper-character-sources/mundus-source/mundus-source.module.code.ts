import { calculateDivinesValue } from "@akasha/temper-characters-equipment/armor-trait-effects"
import type { ArmorItem } from "@akasha/temper-characters-equipment/item-composites"
import type { MetricEffect } from "@akasha/temper-formula-framework/effect"
import type { EffectSourceInterface } from "@akasha/temper-formula-framework/effect-source"
import { mapOf } from "@akasha/temper-formula-framework/map-of"
import { createSourceFile } from "@akasha/temper-formula-framework/source-file"

type MundusMetricEffect = MetricEffect & {
  effectType: "integer" | "fractional-change"
}

interface MundusTemplate extends EffectSourceInterface {
  categoryId: "mundus"
  name: string
  description: string
  esoMundusId: number
  effects: readonly MundusMetricEffect[]
}

const MUNDUS_DATA = {
  "no-mundus": {
    id: "no-mundus" as const,
    name: "No Mundus",
    description: "No mundus stone selected",
    categoryId: "mundus" as const,
    esoMundusId: 0,
    effects: [],
  },
  "the-apprentice": {
    id: "the-apprentice" as const,
    name: "The Apprentice",
    description: "Increases Spell Damage by 238",
    categoryId: "mundus" as const,
    esoMundusId: 13979,
    effects: [
      {
        metricId: "power-spell" as const,
        effectType: "integer" as const,
        effectValue: 238,
      },
    ],
  },
  "the-atronach": {
    id: "the-atronach" as const,
    name: "The Atronach",
    description: "Increases Magicka Recovery by 310",
    categoryId: "mundus" as const,
    esoMundusId: 13982,
    effects: [
      {
        metricId: "magicka-recovery" as const,
        effectType: "integer" as const,
        effectValue: 310,
      },
    ],
  },
  "the-lady": {
    id: "the-lady" as const,
    name: "The Lady",
    description: "Increases Physical and Spell Resistance by 2744",
    categoryId: "mundus" as const,
    esoMundusId: 13976,
    effects: [
      {
        metricId: "resistance" as const,
        effectType: "integer" as const,
        effectValue: 2744,
      },
    ],
  },
  "the-lover": {
    id: "the-lover" as const,
    name: "The Lover",
    description: "Increases Physical and Spell Penetration by 2744",
    categoryId: "mundus" as const,
    esoMundusId: 13981,
    effects: [
      {
        metricId: "penetration" as const,
        effectType: "integer" as const,
        effectValue: 2744,
      },
    ],
  },
  "the-lord": {
    id: "the-lord" as const,
    name: "The Lord",
    description: "Increases Maximum Health by 2225",
    categoryId: "mundus" as const,
    esoMundusId: 13978,
    effects: [
      {
        metricId: "health-maximum" as const,
        effectType: "integer" as const,
        effectValue: 2225,
      },
    ],
  },
  "the-mage": {
    id: "the-mage" as const,
    name: "The Mage",
    description: "Increases Maximum Magicka by 2023",
    categoryId: "mundus" as const,
    esoMundusId: 13943,
    effects: [
      {
        metricId: "magicka-maximum" as const,
        effectType: "integer" as const,
        effectValue: 2023,
      },
    ],
  },
  "the-ritual": {
    id: "the-ritual" as const,
    name: "The Ritual",
    description: "Increases Healing Done by 8%",
    categoryId: "mundus" as const,
    esoMundusId: 13980,
    effects: [
      {
        metricId: "healing-done-base" as const,
        effectType: "fractional-change" as const,
        effectValue: 0.08,
      },
    ],
  },
  "the-serpent": {
    id: "the-serpent" as const,
    name: "The Serpent",
    description: "Increases Stamina Recovery by 310",
    categoryId: "mundus" as const,
    esoMundusId: 13974,
    effects: [
      {
        metricId: "stamina-recovery" as const,
        effectType: "integer" as const,
        effectValue: 310,
      },
    ],
  },
  "the-shadow": {
    id: "the-shadow" as const,
    name: "The Shadow",
    description: "Increases Critical Damage and Healing done by 11%",
    categoryId: "mundus" as const,
    esoMundusId: 13984,
    effects: [
      {
        metricId: "critical-damage" as const,
        effectType: "fractional-change" as const,
        effectValue: 0.11,
      },
      {
        metricId: "healing-critical-bonus" as const,
        effectType: "fractional-change" as const,
        effectValue: 0.11,
      },
    ],
  },
  "the-steed": {
    id: "the-steed" as const,
    name: "The Steed",
    description: "Increases Health Recovery by 238 and Movement Speed by 10%",
    categoryId: "mundus" as const,
    esoMundusId: 13977,
    effects: [
      {
        metricId: "health-recovery" as const,
        effectType: "integer" as const,
        effectValue: 238,
      },
      {
        metricId: "movement-speed" as const,
        effectType: "fractional-change" as const,
        effectValue: 0.1,
      },
    ],
  },
  "the-thief": {
    id: "the-thief" as const,
    name: "The Thief",
    description: "Increases Weapon and Spell Critical Strike ratings by 1212",
    categoryId: "mundus" as const,
    esoMundusId: 13975,
    effects: [
      {
        metricId: "critical-rating" as const,
        effectType: "integer" as const,
        effectValue: 1212,
      },
    ],
  },
  "the-tower": {
    id: "the-tower" as const,
    name: "The Tower",
    description: "Increases Maximum Stamina by 2023",
    categoryId: "mundus" as const,
    esoMundusId: 13985,
    effects: [
      {
        metricId: "stamina-maximum" as const,
        effectType: "integer" as const,
        effectValue: 2023,
      },
    ],
  },
  "the-warrior": {
    id: "the-warrior" as const,
    name: "The Warrior",
    description: "Increases Weapon Damage by 238",
    categoryId: "mundus" as const,
    esoMundusId: 13940,
    effects: [
      {
        metricId: "power-weapon" as const,
        effectType: "integer" as const,
        effectValue: 238,
      },
    ],
  },
} satisfies Record<string, MundusTemplate>

export const mundus = createSourceFile<MundusTemplate>()(MUNDUS_DATA)

export type MundusId = (typeof mundus.ids)[number]

export type MundusSource = MundusTemplate & { id: MundusId }

export function createMundusSource<T extends MundusId>(
  mundusId: T,
  armorItems: readonly ArmorItem[]
): (typeof MUNDUS_DATA)[T] {
  const baseMundus = MUNDUS_DATA[mundusId]

  const divinesCount = armorItems.filter((piece) => piece.trait === "divines").length

  if (divinesCount === 0) {
    return baseMundus
  }

  const boostedEffects = mapOf(baseMundus.effects, (effect) => {
    const baseValue = effect.effectValue
    return {
      metricId: effect.metricId,
      effectType: effect.effectType,
      effectValue: calculateDivinesValue(baseValue, armorItems),
    } satisfies MundusMetricEffect
  })

  return {
    ...baseMundus,
    effects: boostedEffects,
  }
}

const MUNDUS_ICON_FILENAMES: Record<MundusId, string | null> = {
  "no-mundus": null,
  "the-apprentice": "constellation_apprentice",
  "the-atronach": "constellation_atronach",
  "the-lady": "constellation_lady",
  "the-lord": "constellation_lord",
  "the-lover": "constellation_lovers",
  "the-mage": "constellation_mage",
  "the-ritual": "constellation_ritual",
  "the-serpent": "constellation_serpent",
  "the-shadow": "constellation_shadow",
  "the-steed": "constellation_stead",
  "the-thief": "constellation_thief",
  "the-tower": "constellation_tower",
  "the-warrior": "constellation_warrior",
}

export function getMundusIconUrl(mundusId: MundusId): string | null {
  const filename = MUNDUS_ICON_FILENAMES[mundusId]
  if (filename == null) return null
  return `https://esoicons.uesp.net/esoui/art/icons/${filename}.png`
}
