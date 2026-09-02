import { migrateControlledRules } from "@akasha/temper-items-rules-core/inventory-rule-controlled"
import { createDefaultRuleSettings } from "@akasha/temper-items-rules-core/inventory-rule-settings"
import type { InventoryRuleSettings } from "@akasha/temper-items-rules-core/inventory-rule-types"
import { isRecord } from "@akasha/utils-narrow/is-record"
import { type RefObject, useCallback, useMemo, useRef } from "react"
import { useInventorySettings } from "../hooks-inventory-settings/hooks-inventory-settings.module.code.ts"
import {
  isInventoryRuleSettings,
  migrateCanListAtGuildTraderCondition,
  migrateCanSellCondition,
  migrateEquipActions,
  migrateGoals,
  migrateRemoveScopesAndFilters,
  migrateValueFieldNames,
} from "../inventory-rule-migrations/inventory-rule-migrations.module.code.ts"

export function preserveLocked<T extends { id: string; locked?: boolean }>(
  replacement: readonly T[],
  previous: readonly T[]
): readonly T[] {
  const locked = previous.filter((r) => r.locked)
  if (locked.length === 0) return replacement
  const lockedIds = new Set(locked.map((r) => r.id))
  const result = replacement.filter((r) => !lockedIds.has(r.id))
  for (const rule of locked) {
    const originalIdx = previous.indexOf(rule)
    const insertAt = Math.min(originalIdx, result.length)
    result.splice(insertAt, 0, rule)
  }
  return result
}

export function useInventoryRuleSettings(): {
  settings: InventoryRuleSettings
} {
  const { inventorySettings: rawSettings } = useInventorySettings()

  const settings = useMemo(() => {
    const raw = rawSettings
    if (!raw) return createDefaultRuleSettings()
    if (isInventoryRuleSettings(raw))
      return migrateControlledRules(
        migrateCanListAtGuildTraderCondition(
          migrateCanSellCondition(
            migrateValueFieldNames(
              migrateRemoveScopesAndFilters(migrateGoals(migrateEquipActions(raw)))
            )
          )
        )
      )
    return createDefaultRuleSettings()
  }, [rawSettings])

  return { settings }
}

export function usePersistSettings() {
  const { updateInventorySettings } = useInventorySettings()
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined)

  return useCallback(
    (next: InventoryRuleSettings, onError?: (err: unknown) => void) => {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => {
        updateInventorySettings(next).catch((err) => onError?.(err))
      }, 300)
    },
    [updateInventorySettings]
  )
}

function canonicalize(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(canonicalize)
  if (!isRecord(value)) return value
  const sorted: Record<string, unknown> = {}
  for (const key of Object.keys(value).sort()) {
    const v = value[key]
    if (v === undefined) continue
    sorted[key] = canonicalize(v)
  }
  return sorted
}

function canonicalizeChain(chain: readonly unknown[]): string {
  return JSON.stringify(canonicalize(chain))
}

export function rulesFingerprint(s: InventoryRuleSettings): string {
  const rules = [...s.rules]
    .sort((a, b) => a.id.localeCompare(b.id))
    .map(
      (r) =>
        `${r.id}:${r.categoryId}:${r.action}:${r.destination ?? ""}:${r.updatedAt ?? 0}:${r.active !== false}:${r.locked === true}:${r.goal ?? ""}:${r.title ?? ""}:${r.notes ?? ""}:${r.stockScope ?? ""}:${r.destinationChain !== undefined ? canonicalizeChain(r.destinationChain) : ""}`
    )
    .join("|")
  const itemRules = [...(s.itemRules ?? [])]
    .sort((a, b) => a.id.localeCompare(b.id))
    .map(
      (r) =>
        `${r.id}:${r.itemId}:${r.action}:${r.destination ?? ""}:${r.updatedAt ?? 0}:${r.active !== false}:${r.locked === true}:${r.goal ?? ""}:${r.title ?? ""}:${r.notes ?? ""}`
    )
    .join("|")
  const buyRules = [...(s.buyRules ?? [])]
    .sort((a, b) => a.id.localeCompare(b.id))
    .map(
      (r) =>
        `${r.id}:${r.itemId}:${r.targetQuantity}:${r.source}:${r.updatedAt ?? 0}:${r.active !== false}:${r.locked === true}:${r.goal ?? ""}:${r.title ?? ""}:${r.notes ?? ""}`
    )
    .join("|")
  return `${rules}~${itemRules}~${buyRules}`
}

export function useStableSettingsHandler<A extends unknown[]>(
  settingsRef: RefObject<InventoryRuleSettings>,
  applyChange: (next: InventoryRuleSettings) => void,
  fn: (settings: InventoryRuleSettings, ...args: A) => InventoryRuleSettings
): (...args: A) => void {
  return useCallback(
    (...args: A) => {
      applyChange(fn(settingsRef.current, ...args))
    },
    [applyChange, fn]
  )
}
