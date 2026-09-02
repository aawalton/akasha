import type { SetId } from "@akasha/temper-equipment/set-ids"
import type { EquipmentQualityId } from "@akasha/temper-equipment-kinds/equipment-qualities"
import type { Effect } from "@akasha/temper-formula-framework/effect"
import { isMetricEffect } from "@akasha/temper-formula-framework/effect"
import type { EffectSourceInterface } from "@akasha/temper-formula-framework/effect-source"
import { createDataFile } from "@akasha/utils-narrow/create-data-file"
import { setsAll } from "../sets-all/sets-all.module.code.ts"

interface SetSourceTemplate extends EffectSourceInterface<"sets", Effect> {
  categoryId: "sets"
  name: string
  setName: string
  setId: string
  pieceCount: number
  bonusCount: number
}

function generateSetSources(): Record<string, SetSourceTemplate> {
  const sources: Record<string, SetSourceTemplate> = {}

  for (const set of setsAll.list) {
    for (let pieceCount = 1; pieceCount <= 12; pieceCount++) {
      const activeBonuses = set.bonuses.filter((bonus) => bonus.count <= pieceCount)

      const effects: Effect[] = activeBonuses.flatMap((bonus) => bonus.effects)

      const id = `set-${set.id}-${pieceCount}` as const

      sources[id] = {
        id,
        categoryId: "sets" as const,
        name: `${set.name} (${pieceCount} pieces)`,
        setName: set.name,
        setId: set.id,
        pieceCount,
        bonusCount: activeBonuses.length,
        effects,
      }
    }
  }

  return sources
}

const SET_SOURCES = generateSetSources() satisfies Record<string, SetSourceTemplate>

const setSources = createDataFile<SetSourceTemplate>()(SET_SOURCES)

export type SetSource = SetSourceTemplate & { id: SetSourceId }

export type SetSourceId = (typeof setSources.ids)[number]

export function isSetSourceId(value: string): value is SetSourceId {
  return setSources.has(value)
}

const QUALITY_MULTIPLIERS: Record<EquipmentQualityId, number> = {
  normal: 0.9067,
  fine: 0.941,
  superior: 0.941,
  epic: 0.965,
  legendary: 1.0,
}

function calculateSetBonusMultiplier(pieceQualities: readonly EquipmentQualityId[]): number {
  if (pieceQualities.length === 0) {
    return 1.0
  }

  const totalMultiplier = pieceQualities.reduce(
    (sum, quality) => sum + QUALITY_MULTIPLIERS[quality],
    0
  )
  const avgMultiplier = totalMultiplier / pieceQualities.length

  if (avgMultiplier >= 1.0) return 1.0
  if (avgMultiplier >= 0.988) return 0.988
  if (avgMultiplier >= 0.977) return 0.977
  return avgMultiplier
}

function scaleSetBonusEffect(effect: Effect, multiplier: number): Effect {
  if (isMetricEffect(effect) && effect.effectType === "integer" && multiplier < 1.0) {
    return {
      ...effect,
      effectValue: Math.round(effect.effectValue * multiplier),
    }
  }
  return effect
}

export function createSetSource(
  setId: SetId,
  pieceCount: number,
  pieceQualities?: readonly EquipmentQualityId[]
): SetSource | null {
  const id = `set-${setId}-${pieceCount}`

  const baseSource = setSources.data[id]
  if (baseSource === undefined) {
    return null
  }

  if (!pieceQualities || pieceQualities.every((q) => q === "legendary")) {
    return baseSource
  }

  const multiplier = calculateSetBonusMultiplier(pieceQualities)

  if (multiplier >= 1.0) {
    return baseSource
  }

  const scaledEffects = baseSource.effects.map((effect) => scaleSetBonusEffect(effect, multiplier))

  return {
    ...baseSource,
    effects: scaledEffects,
  }
}
