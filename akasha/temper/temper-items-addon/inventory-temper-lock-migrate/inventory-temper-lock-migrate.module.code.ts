import {
  ADDON_NAME,
  BANK_BAGS,
  PERSONAL_BAGS,
} from "../inventory-constants/inventory-constants.module.code.ts"
import { shouldSeedTemperLock } from "../inventory-temper-lock-core/inventory-temper-lock-core.module.code.ts"
import {
  isTemperLocked,
  setTemperLock,
} from "../inventory-temper-lock-store/inventory-temper-lock-store.module.code.ts"
export function migrateLocksToTemperLocks(): undefined {
  const bags = [...PERSONAL_BAGS, ...BANK_BAGS]
  let seeded = 0
  for (const bagId of bags) {
    const bagSize = GetBagSize(bagId)
    for (let slotIndex = 0; slotIndex < bagSize; slotIndex++) {
      const [stackCount] = GetSlotStackSize(bagId, slotIndex)
      if (stackCount === 0) continue
      const nativeLocked = IsItemPlayerLocked(bagId, slotIndex)
      if (!shouldSeedTemperLock(nativeLocked, isTemperLocked(bagId, slotIndex))) continue
      setTemperLock(bagId, slotIndex)
      seeded++
    }
  }
  if (seeded > 0) {
    d(`[${ADDON_NAME}] Seeded ${seeded} Temper Lock(s) from native locks`)
  }
}
