import { signatureMatchesItem } from "@akasha/temper-items-core/equipment-signature-matcher"
import { ESO_BAG_WORN } from "@akasha/temper-items-core/eso-bag-constants"
import type {
  WantedCompanionEquipmentSignature,
  WantedEquipmentSignature,
} from "@akasha/temper-items-rules-core/inventory-rule-compiler-types"
import type { ClassifiedInventoryItem } from "@akasha/temper-items-rules-core/inventory-rule-matcher-types"

export interface FillOnceResult {
  included: readonly ClassifiedInventoryItem[]
  preFilled: readonly ClassifiedInventoryItem[]
}

export function applyFillOnceCI(
  candidates: readonly ClassifiedInventoryItem[],
  signatures: readonly WantedEquipmentSignature[]
): FillOnceResult {
  const remaining = Array<number>(signatures.length).fill(1)
  const preFilled: ClassifiedInventoryItem[] = []

  for (const ci of candidates) {
    if (ci.bagId !== ESO_BAG_WORN) continue
    for (const [i, signature] of signatures.entries()) {
      if ((remaining[i] ?? 0) <= 0) continue
      if (ci.locationKey !== signature.esoCharId) continue
      if (signatureMatchesItem(signature, ci.item)) {
        remaining[i] = (remaining[i] ?? 0) - 1
        preFilled.push(ci)
        break
      }
    }
  }

  const preFilledSet = new Set(preFilled)
  const included: ClassifiedInventoryItem[] = []
  for (const ci of candidates) {
    if (preFilledSet.has(ci)) continue
    for (const [i, signature] of signatures.entries()) {
      if ((remaining[i] ?? 0) <= 0) continue
      if (signatureMatchesItem(signature, ci.item)) {
        remaining[i] = (remaining[i] ?? 0) - 1
        included.push(ci)
        break
      }
    }
  }

  return { included, preFilled }
}

export function applyFillOnceCompanionCI(
  candidates: readonly ClassifiedInventoryItem[],
  signatures: readonly WantedCompanionEquipmentSignature[]
): FillOnceResult {
  const remaining = Array<number>(signatures.length).fill(1)
  const preFilled: ClassifiedInventoryItem[] = []

  for (const ci of candidates) {
    for (const [i, signature] of signatures.entries()) {
      if ((remaining[i] ?? 0) <= 0) continue
      if (ci.locationKey !== `Companion:${signature.companionName}`) continue
      if (signatureMatchesItem(signature, ci.item)) {
        remaining[i] = (remaining[i] ?? 0) - 1
        preFilled.push(ci)
        break
      }
    }
  }

  const preFilledSet = new Set(preFilled)
  const included: ClassifiedInventoryItem[] = []
  for (const ci of candidates) {
    if (preFilledSet.has(ci)) continue
    for (const [i, signature] of signatures.entries()) {
      if ((remaining[i] ?? 0) <= 0) continue
      if (signatureMatchesItem(signature, ci.item)) {
        remaining[i] = (remaining[i] ?? 0) - 1
        included.push(ci)
        break
      }
    }
  }

  return { included, preFilled }
}
