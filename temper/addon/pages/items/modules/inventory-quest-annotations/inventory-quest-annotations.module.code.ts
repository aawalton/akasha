import {
  ADDON_NAME,
  BANK_BAGS,
} from "akasha/temper/addon/pages/items/modules/inventory-constants/inventory-constants.module.code.ts"
import { getSavedVariables } from "akasha/temper/addon/pages/items/modules/inventory-saved-variables-ref/inventory-saved-variables-ref.module.code.ts"
import type { QuestAnnotation } from "akasha/temper/addon/pages/items/modules/inventory-saved-variables-types/inventory-saved-variables-types.module.code.ts"
import "akasha/temper/eso/type/eso-enums-07/eso-enums-07.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-09/eso-enums-09.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-11/eso-enums-11.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-13/eso-enums-13.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-03/eso-functions-03.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-04/eso-functions-04.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-08/eso-functions-08.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
interface PendingQuestCompletion {
  questId: number
  questType: "delve" | "group-boss" | "world-event"
  timestamp: number
}

let pendingQuestCompletion: PendingQuestCompletion | undefined

function classifyFromCompletionType(
  completionType: number
): "delve" | "group-boss" | "world-event" | undefined {
  if (completionType === ZONE_COMPLETION_TYPE_DELVES) return "delve"
  if (completionType === ZONE_COMPLETION_TYPE_GROUP_BOSSES) return "group-boss"
  if (completionType === ZONE_COMPLETION_TYPE_WORLD_EVENTS) return "world-event"
  return undefined
}

export function onQuestRemoved(
  this: void,
  isCompleted: boolean,
  zoneIndex: number,
  poiIndex: number,
  questID: number
): undefined {
  if (!isCompleted) return
  if (GetQuestRepeatableType(questID) !== QUEST_REPEAT_DAILY) return

  let questType: "delve" | "group-boss" | "world-event" | undefined

  if (poiIndex !== 0) {
    const completionType = GetPOIZoneCompletionType(zoneIndex, poiIndex)
    questType = classifyFromCompletionType(completionType)
  }

  if (questType === undefined) {
    const [, , zIdx, pIdx] = GetCompletedQuestLocationInfo(questID)
    if (pIdx !== 0) {
      const completionType = GetPOIZoneCompletionType(zIdx, pIdx)
      questType = classifyFromCompletionType(completionType)
    }
  }

  if (questType === undefined) return

  pendingQuestCompletion = { questId: questID, questType, timestamp: GetTimeStamp() }
}

export function annotateContainerIfPending(bagId: number, slotIndex: number): undefined {
  if (pendingQuestCompletion === undefined) return

  if (GetTimeStamp() - pendingQuestCompletion.timestamp > 30) {
    pendingQuestCompletion = undefined
    return
  }

  const [itemType] = GetItemType(bagId, slotIndex)
  if (itemType !== ITEMTYPE_CONTAINER && itemType !== ITEMTYPE_CONTAINER_STACKABLE) return

  const uniqueId = GetItemUniqueId(bagId, slotIndex)
  if (uniqueId === undefined) return
  const key = Id64ToString(uniqueId)
  if (key === "" || key === "0") return

  const sv = getSavedVariables()
  if (!sv.questAnnotations) {
    sv.questAnnotations = {}
  }
  sv.questAnnotations[key] = {
    questType: pendingQuestCompletion.questType,
    questId: pendingQuestCompletion.questId,
  }

  pendingQuestCompletion = undefined
}

export function getQuestAnnotation(bagId: number, slotIndex: number): QuestAnnotation | undefined {
  const uniqueId = GetItemUniqueId(bagId, slotIndex)
  if (uniqueId === undefined) return undefined
  const key = Id64ToString(uniqueId)
  if (key === "" || key === "0") return undefined
  const sv = getSavedVariables()
  return sv.questAnnotations?.[key]
}

export function pruneStaleAnnotations(): undefined {
  const sv = getSavedVariables()
  if (!sv.questAnnotations) return

  const knownIds = new Set<string>()

  const backpackSize = GetBagSize(BAG_BACKPACK)
  for (let slot = 0; slot < backpackSize; slot++) {
    const uniqueId = GetItemUniqueId(BAG_BACKPACK, slot)
    if (uniqueId === undefined) continue
    const key = Id64ToString(uniqueId)
    if (key !== "" && key !== "0") knownIds.add(key)
  }

  for (const bankBag of BANK_BAGS) {
    const bagSize = GetBagSize(bankBag)
    for (let slot = 0; slot < bagSize; slot++) {
      const uniqueId = GetItemUniqueId(bankBag, slot)
      if (uniqueId === undefined) continue
      const key = Id64ToString(uniqueId)
      if (key !== "" && key !== "0") knownIds.add(key)
    }
  }

  let pruned = 0
  for (const key of Object.keys(sv.questAnnotations)) {
    if (!knownIds.has(key)) {
      delete sv.questAnnotations[key]
      pruned++
    }
  }

  if (Object.keys(sv.questAnnotations).length === 0) {
    sv.questAnnotations = undefined
  }

  if (pruned > 0) {
    d(`[${ADDON_NAME}] Pruned ${pruned} stale quest annotation(s)`)
  }
}
