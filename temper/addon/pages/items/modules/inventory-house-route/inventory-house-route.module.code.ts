import { ADDON_NAME } from "akasha/temper/addon/pages/items/modules/inventory-constants/inventory-constants.module.code.ts"
import { getDatabase } from "akasha/temper/addon/pages/items/modules/inventory-saved-variables-ref/inventory-saved-variables-ref.module.code.ts"
import {
  allotHouses,
  chainHouses,
  firstHouseWithRoom,
  houseDestinationOf,
  roomsIn,
} from "akasha/temper/items/rules/core/modules/house-destination/house-destination.module.code.ts"
import type { CompiledOrderedRule } from "akasha/temper/items/rules/core/modules/inventory-rule-compiler-types/inventory-rule-compiler-types.module.code.ts"
import type { DestinationChain } from "akasha/temper/items/rules/core/modules/inventory-rule-types/inventory-rule-types.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
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

export function houseLegOf(
  rule: CompiledOrderedRule | undefined,
  action: string,
  itemLink: string,
  units: number
): string | undefined {
  if (rule === undefined || action !== "move-to") return undefined
  if (chainHouses(rule.destinationChain).length === 0) return undefined
  const limitType = GetItemLinkFurnishingLimitType(itemLink)
  const bound = { chain: rule.destinationChain, limitType, units }
  const collectibleId = firstHouseWithRoom(bound, roomsIn(getDatabase().locations))
  return collectibleId === undefined ? undefined : houseDestinationOf(collectibleId)
}

export function allotVaultStacks(
  candidates: readonly VaultHouseCandidate[]
): readonly { readonly slotIndex: number; readonly ruleIndex: number; readonly house: number }[] {
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
