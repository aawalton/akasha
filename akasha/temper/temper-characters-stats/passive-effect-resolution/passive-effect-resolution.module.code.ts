import type { StandardArmorWeightId } from "@akasha/temper-equipment/armor-weight-ids"
import type {
  ArmorPieceScalingEffect,
  Effect,
  MetricEffect,
  SlottedAbilityScalingEffect,
  WeaponTypeConditionalEffect,
} from "@akasha/temper-formula-framework/effect"
import {
  isArmorPieceScalingEffect,
  isSlottedAbilityScalingEffect,
  isWeaponTypeConditionalEffect,
} from "@akasha/temper-formula-framework/effect"
import type { SkillLineId } from "@akasha/temper-skill-lines/skill-lines"

function resolveEffects<E extends Effect>(
  effects: readonly Effect[],
  matches: (effect: Effect) => effect is E,
  resolve: (effect: E) => MetricEffect | null
): readonly Effect[] {
  const resolvedEffects: Effect[] = []

  for (const effect of effects) {
    if (matches(effect)) {
      const resolved = resolve(effect)
      if (resolved) {
        resolvedEffects.push(resolved)
      }
    } else {
      resolvedEffects.push(effect)
    }
  }

  return resolvedEffects
}

function resolveWeaponTypeConditionalEffect(
  effect: WeaponTypeConditionalEffect,
  weaponTypeIds: readonly string[]
): MetricEffect | null {
  let matchCount = 0
  for (const weaponTypeId of weaponTypeIds) {
    if (effect.weaponTypes.includes(weaponTypeId)) {
      matchCount++
    }
  }

  if (matchCount === 0) {
    return null
  }

  const multiplier = effect.perWeapon ? matchCount : 1
  const finalValue = effect.effectValue * multiplier

  if (effect.valueType === "integer") {
    return {
      metricId: effect.metricId,
      effectType: "integer",
      effectValue: finalValue,
    }
  } else {
    return {
      metricId: effect.metricId,
      effectType: "fractional-change",
      effectValue: finalValue,
    }
  }
}

export function resolveWeaponTypeConditionalEffects(
  effects: readonly Effect[],
  weaponTypeIds: readonly string[]
): readonly Effect[] {
  return resolveEffects(effects, isWeaponTypeConditionalEffect, (effect) =>
    resolveWeaponTypeConditionalEffect(effect, weaponTypeIds)
  )
}

function resolveSlottedAbilityScalingEffect(
  effect: SlottedAbilityScalingEffect,
  slottedCountsByLine: Partial<Record<string, number>>
): MetricEffect | null {
  const slottedCount = slottedCountsByLine[effect.skillLineId] ?? 0

  if (slottedCount === 0) {
    return null
  }

  const finalValue = effect.valuePerAbility * slottedCount

  return {
    metricId: effect.metricId,
    effectType: "integer",
    effectValue: finalValue,
  }
}

export function resolveSlottedAbilityScalingEffects(
  effects: readonly Effect[],
  slottedCountsByLine: Partial<Record<SkillLineId, number>>
): readonly Effect[] {
  return resolveEffects(effects, isSlottedAbilityScalingEffect, (effect) =>
    resolveSlottedAbilityScalingEffect(effect, slottedCountsByLine)
  )
}

function resolveArmorPieceScalingEffect(
  effect: ArmorPieceScalingEffect,
  armorWeightCounts: Partial<Record<string, number>>
): MetricEffect | null {
  const pieceCount = armorWeightCounts[effect.armorWeight] ?? 0

  if (pieceCount === 0) {
    return null
  }

  const finalValue = effect.valuePerPiece * pieceCount

  return {
    metricId: effect.metricId,
    effectType: effect.valueType,
    effectValue: finalValue,
  }
}

export function resolveArmorPieceScalingEffects(
  effects: readonly Effect[],
  armorWeightCounts: Record<StandardArmorWeightId, number>
): readonly Effect[] {
  return resolveEffects(effects, isArmorPieceScalingEffect, (effect) =>
    resolveArmorPieceScalingEffect(effect, armorWeightCounts)
  )
}
