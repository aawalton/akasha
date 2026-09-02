import {
  type BuffOrDebuffId,
  buffOrDebuff,
} from "@akasha/temper-formula-framework/buff-or-debuff-source"
import type { Effect } from "@akasha/temper-formula-framework/effect"
import { isBuffOrDebuffEffect, isMetricEffect } from "@akasha/temper-formula-framework/effect"
import type { EffectSource } from "@akasha/temper-formula-framework/effect-source"
import type { MetricId } from "@akasha/temper-formula-framework/metric-id"
import { metrics } from "../metrics/metrics.module.code.ts"

interface EffectSourceDiff {
  added: readonly EffectSource[]
  removed: readonly EffectSource[]
  modified: ReadonlyArray<{
    oldSource: EffectSource
    newSource: EffectSource
    addedEffects: readonly Effect[]
    removedEffects: readonly Effect[]
  }>
}

interface EffectChangeSummary {
  affectedMetricIds: Set<MetricId>
  addedBuffIds: readonly BuffOrDebuffId[]
  removedBuffIds: readonly BuffOrDebuffId[]
}

function effectToKey(effect: Effect): string {
  if (isMetricEffect(effect)) {
    const valueStr =
      typeof effect.effectValue === "object"
        ? JSON.stringify(effect.effectValue)
        : String(effect.effectValue)
    return `metric:${effect.metricId}:${effect.effectType}:${valueStr}`
  }
  if (isBuffOrDebuffEffect(effect)) {
    const duration = effect.seconds ?? "perpetual"
    if ("buffId" in effect) {
      return `buff:${effect.buffId}:${duration}`
    }
    return `debuff:${effect.debuffId}:${duration}`
  }
  return `unknown:${JSON.stringify(effect)}`
}

function diffEffects(
  oldEffects: readonly Effect[],
  newEffects: readonly Effect[]
): { addedEffects: readonly Effect[]; removedEffects: readonly Effect[] } {
  const oldKeys = new Set(oldEffects.map(effectToKey))
  const newKeys = new Set(newEffects.map(effectToKey))

  const addedEffects = newEffects.filter((e) => !oldKeys.has(effectToKey(e)))
  const removedEffects = oldEffects.filter((e) => !newKeys.has(effectToKey(e)))

  return { addedEffects, removedEffects }
}

export function diffEffectSources(
  oldSources: readonly EffectSource[],
  newSources: readonly EffectSource[]
): EffectSourceDiff {
  const oldById = new Map<string, EffectSource>()
  for (const source of oldSources) {
    oldById.set(source.id, source)
  }

  const newById = new Map<string, EffectSource>()
  for (const source of newSources) {
    newById.set(source.id, source)
  }

  const added: EffectSource[] = []
  const removed: EffectSource[] = []
  type ModifiedEntry = {
    oldSource: EffectSource
    newSource: EffectSource
    addedEffects: readonly Effect[]
    removedEffects: readonly Effect[]
  }
  const modified: ModifiedEntry[] = []

  for (const [id, newSource] of newById) {
    const oldSource = oldById.get(id)
    if (!oldSource) {
      added.push(newSource)
    } else {
      const { addedEffects, removedEffects } = diffEffects(oldSource.effects, newSource.effects)
      if (addedEffects.length > 0 || removedEffects.length > 0) {
        modified.push({ oldSource, newSource, addedEffects, removedEffects })
      }
    }
  }

  for (const [id, oldSource] of oldById) {
    if (!newById.has(id)) {
      removed.push(oldSource)
    }
  }

  return { added, removed, modified }
}

function extractMetricIds(effects: readonly Effect[]): readonly MetricId[] {
  const ids: MetricId[] = []
  for (const effect of effects) {
    if (isMetricEffect(effect) && metrics.has(effect.metricId)) {
      ids.push(effect.metricId)
    }
  }
  return ids
}

function extractBuffIds(effects: readonly Effect[]): readonly BuffOrDebuffId[] {
  const ids: BuffOrDebuffId[] = []
  for (const effect of effects) {
    if (!isBuffOrDebuffEffect(effect)) continue
    const id = "buffId" in effect ? effect.buffId : effect.debuffId
    if (buffOrDebuff.has(id)) {
      ids.push(id)
    }
  }
  return ids
}

export function summarizeEffectChanges(diff: EffectSourceDiff): EffectChangeSummary {
  const affectedMetricIds = new Set<MetricId>()
  const addedBuffIds: BuffOrDebuffId[] = []
  const removedBuffIds: BuffOrDebuffId[] = []

  for (const source of diff.added) {
    for (const metricId of extractMetricIds(source.effects)) {
      affectedMetricIds.add(metricId)
    }
    addedBuffIds.push(...extractBuffIds(source.effects))
  }

  for (const source of diff.removed) {
    for (const metricId of extractMetricIds(source.effects)) {
      affectedMetricIds.add(metricId)
    }
    removedBuffIds.push(...extractBuffIds(source.effects))
  }

  for (const { addedEffects, removedEffects } of diff.modified) {
    for (const metricId of extractMetricIds(addedEffects)) {
      affectedMetricIds.add(metricId)
    }
    for (const metricId of extractMetricIds(removedEffects)) {
      affectedMetricIds.add(metricId)
    }
    addedBuffIds.push(...extractBuffIds(addedEffects))
    removedBuffIds.push(...extractBuffIds(removedEffects))
  }

  return { affectedMetricIds, addedBuffIds, removedBuffIds }
}
