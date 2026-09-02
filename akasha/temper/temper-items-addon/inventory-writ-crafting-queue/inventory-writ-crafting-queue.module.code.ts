import { requireFirst } from "@akasha/utils-narrow/require-first"
import { ADDON_NAME } from "../inventory-constants/inventory-constants.module.code.ts"
import { getActionReportLevel } from "../inventory-rules-core-report/inventory-rules-core-report.module.code.ts"
export interface WritCraftRequest {
  craftType: number
  questIndex: number
  conditionIndex: number
  execute: (this: void) => void
}

const CRAFT_STEP_DELAY_MS = 25

const STATION_EXIT_DELAY_MS = 200

export let queue: WritCraftRequest[] = []
export let processing = false

export function enqueueWritCraft(request: WritCraftRequest): undefined {
  queue.push(request)
  if (!processing) {
    craftNext()
  }
}

export function craftNext(): undefined {
  if (queue.length === 0) {
    processing = false
    return
  }
  if (ZO_CraftingUtils_IsPerformingCraftProcess()) {
    zo_callLater(function (this: void): undefined {
      craftNext()
    }, CRAFT_STEP_DELAY_MS)
    return
  }
  processing = true
  const request = requireFirst(queue)
  request.execute()
}

function exitCraftingStation(this: void): undefined {
  if (getActionReportLevel() === "verbose") {
    d(`[${ADDON_NAME}] writ: all crafts done, exiting station`)
  }
  zo_callLater(function (this: void): undefined {
    EndInteraction(INTERACTION_CRAFT)
  }, STATION_EXIT_DELAY_MS)
}

export function onWritCraftCompleted(
  this: void,
  _eventCode: number,
  _craftSkill: number
): undefined {
  if (!processing) return
  if (queue.length > 0) {
    queue.shift()
  }
  if (queue.length > 0) {
    zo_callLater(function (this: void): undefined {
      craftNext()
    }, CRAFT_STEP_DELAY_MS)
  } else {
    processing = false
    exitCraftingStation()
  }
}

export function clearWritCraftQueue(): undefined {
  queue = []
  processing = false
}

export function isWritCraftProcessing(): boolean {
  return processing
}

export function getWritCraftQueueLength(): number {
  return queue.length
}
