import { getSavedVariables } from "../inventory-saved-variables-ref/inventory-saved-variables-ref.module.code.ts"
import {
  isValidLockKey,
  selectStaleLockKeys,
} from "../inventory-temper-lock-core/inventory-temper-lock-core.module.code.ts"
export function temperLockKeyForSlot(bagId: number, slotIndex: number): string | undefined {
  const uniqueId = GetItemUniqueId(bagId, slotIndex)
  if (uniqueId === undefined) return undefined
  const key = Id64ToString(uniqueId)
  return isValidLockKey(key) ? key : undefined
}

export function isTemperLocked(bagId: number, slotIndex: number): boolean {
  const key = temperLockKeyForSlot(bagId, slotIndex)
  if (key === undefined) return false
  return getSavedVariables().temperLocks?.[key] === true
}

export function setTemperLock(bagId: number, slotIndex: number): undefined {
  const key = temperLockKeyForSlot(bagId, slotIndex)
  if (key === undefined) return
  const sv = getSavedVariables()
  if (!sv.temperLocks) sv.temperLocks = {}
  sv.temperLocks[key] = true
}

export function clearTemperLock(bagId: number, slotIndex: number): undefined {
  const key = temperLockKeyForSlot(bagId, slotIndex)
  if (key === undefined) return
  const sv = getSavedVariables()
  if (!sv.temperLocks) return
  delete sv.temperLocks[key]
  if (Object.keys(sv.temperLocks).length === 0) sv.temperLocks = undefined
}

export function toggleTemperLock(bagId: number, slotIndex: number): boolean {
  if (isTemperLocked(bagId, slotIndex)) {
    clearTemperLock(bagId, slotIndex)
    return false
  }
  setTemperLock(bagId, slotIndex)
  return true
}

export function pruneStaleTemperLocks(bags: readonly number[]): number {
  const sv = getSavedVariables()
  if (!sv.temperLocks) return 0

  const liveKeys = new Set<string>()
  for (const bagId of bags) {
    const bagSize = GetBagSize(bagId)
    for (let slot = 0; slot < bagSize; slot++) {
      const uniqueId = GetItemUniqueId(bagId, slot)
      if (uniqueId === undefined) continue
      const key = Id64ToString(uniqueId)
      if (isValidLockKey(key)) liveKeys.add(key)
    }
  }

  const stale = selectStaleLockKeys(Object.keys(sv.temperLocks), liveKeys)
  for (const key of stale) delete sv.temperLocks[key]
  if (Object.keys(sv.temperLocks).length === 0) sv.temperLocks = undefined
  return stale.length
}
