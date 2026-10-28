import { ADDON_NAME } from "akasha/temper/addon/pages/items/modules/inventory-constants/inventory-constants.module.code.ts"
import { getCompiledConfig } from "akasha/temper/addon/pages/items/modules/inventory-rules-core/inventory-rules-core.module.code.ts"
import { getDatabase } from "akasha/temper/addon/pages/items/modules/inventory-saved-variables-ref/inventory-saved-variables-ref.module.code.ts"
import {
  allotHouses,
  roomsIn,
} from "akasha/temper/items/rules/core/modules/house-destination/house-destination.module.code.ts"
import type { DestinationChain } from "akasha/temper/items/rules/core/modules/inventory-rule-types/inventory-rule-types.module.code.ts"
import { storageCarrierOf } from "akasha/temper/items/rules/routing/core/modules/inventory-consolidate-dest/inventory-consolidate-dest.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-01/eso-enums-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-07/eso-enums-07.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-08/eso-functions-08.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-02/eso-functions-02.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-09/eso-functions-09.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"

export interface VaultHouseCandidate {
  readonly slotIndex: number
  readonly ruleIndex: number
  readonly chain: DestinationChain | undefined
  readonly limitType: number
  readonly units: number
}

export interface VaultHouseWithdrawal {
  readonly slotIndex: number
  readonly ruleIndex: number
  readonly house: number
}

export function vaultHouseWithdrawals(
  slots: readonly { readonly slotIndex: number; readonly ruleIndex: number }[]
): readonly VaultHouseWithdrawal[] {
  const compiled = getCompiledConfig()
  const carrier = storageCarrierOf(compiled?.characterPriority)
  if (carrier !== undefined && carrier !== tostring(GetCurrentCharacterId())) return []
  const candidates: VaultHouseCandidate[] = []
  for (const { slotIndex, ruleIndex } of slots) {
    const [units] = GetSlotStackSize(BAG_FURNITURE_VAULT, slotIndex)
    const itemLink = GetItemLink(BAG_FURNITURE_VAULT, slotIndex, LINK_STYLE_BRACKETS)
    if (units === 0 || itemLink === "") continue
    const chain = compiled?.orderedRules[ruleIndex]?.destinationChain
    const limitType = GetItemLinkFurnishingLimitType(itemLink)
    candidates.push({ slotIndex, ruleIndex, chain, limitType, units })
  }
  return allotVaultStacks(candidates)
}

function allotVaultStacks(
  candidates: readonly VaultHouseCandidate[]
): readonly VaultHouseWithdrawal[] {
  const allotted = allotHouses(candidates, roomsIn(getDatabase().locations))
  return allotted.map((one) => ({
    slotIndex: one.bound.slotIndex,
    ruleIndex: one.bound.ruleIndex,
    house: one.collectibleId,
  }))
}

export function sayHouseWithdrawals(stacksByHouse: ReadonlyMap<number, number>): undefined {
  if (stacksByHouse.size === 0) return
  const parts: string[] = []
  for (const [collectibleId, stacks] of stacksByHouse) {
    parts.push(`${zo_strformat("<<1>>", GetCollectibleName(collectibleId))} ${stacks}`)
  }
  d(`[${ADDON_NAME}] Stacks to place, by house: ${parts.join(", ")}`)
}
