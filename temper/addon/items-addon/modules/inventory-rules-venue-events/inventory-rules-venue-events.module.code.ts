import {
  beginVenueTrace,
  finishVenueOpenHandler,
  markVenueClosed,
  releaseBankTrace,
} from "akasha/temper/addon/items-addon/modules/inventory-bank-trace/inventory-bank-trace.module.code.ts"
import {
  flushJunkGate,
  openJunkGate,
} from "akasha/temper/addon/items-addon/modules/inventory-junk-queue/inventory-junk-queue.module.code.ts"
import { onQuestRemoved } from "akasha/temper/addon/items-addon/modules/inventory-quest-annotations/inventory-quest-annotations.module.code.ts"
import { releaseConfirmDialog } from "akasha/temper/addon/items-addon/modules/inventory-rules-core-confirm-dialog/inventory-rules-core-confirm-dialog.module.code.ts"
import { onOpenTradingHouse } from "akasha/temper/addon/items-addon/modules/inventory-rules-dispatch/inventory-rules-dispatch.module.code.ts"
import { onOpenCraftingStation } from "akasha/temper/addon/items-addon/modules/inventory-rules-dispatch-guild-crafting/inventory-rules-dispatch-guild-crafting.module.code.ts"
import { onOpenMailbox } from "akasha/temper/addon/items-addon/modules/inventory-rules-dispatch-mail/inventory-rules-dispatch-mail.module.code.ts"
import {
  onOpenFence,
  onOpenStore,
} from "akasha/temper/addon/items-addon/modules/inventory-rules-dispatch-vendor/inventory-rules-dispatch-vendor.module.code.ts"
import { onTradingHouseClosed } from "akasha/temper/addon/items-addon/modules/inventory-rules-list/inventory-rules-list.module.code.ts"
import { invalidateScribingKnowledgeCache } from "akasha/temper/addon/items-addon/modules/inventory-scribing-knowledge/inventory-scribing-knowledge.module.code.ts"
import {
  clearWritCraftQueue,
  onWritCraftCompleted,
} from "akasha/temper/addon/items-addon/modules/inventory-writ-crafting-queue/inventory-writ-crafting-queue.module.code.ts"
import "akasha/temper/eso/type/eso-event-manager/eso-event-manager.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-events/eso-events.type-declaration.d.ts"
export function registerVenueDispatchEvents(ns: string): undefined {
  EVENT_MANAGER.RegisterForEvent(
    `${ns}_OpenStore`,
    EVENT_OPEN_STORE,
    function (this: void): undefined {
      beginVenueTrace("store", 0)
      openJunkGate()
      onOpenStore()
      finishVenueOpenHandler()
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    `${ns}_OpenFence`,
    EVENT_OPEN_FENCE,
    function (
      this: void,
      _eventCode: number,
      allowSell: boolean,
      allowLaunder: boolean
    ): undefined {
      beginVenueTrace("fence", 0)
      openJunkGate()
      onOpenFence(allowSell, allowLaunder)
      finishVenueOpenHandler()
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    `${ns}_CraftingStation`,
    EVENT_CRAFTING_STATION_INTERACT,
    function (this: void): undefined {
      releaseBankTrace()
      onOpenCraftingStation()
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    `${ns}_OpenMailbox`,
    EVENT_MAIL_OPEN_MAILBOX,
    function (this: void): undefined {
      releaseBankTrace()
      onOpenMailbox()
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    `${ns}_OpenTradingHouse`,
    EVENT_OPEN_TRADING_HOUSE,
    function (this: void): undefined {
      releaseBankTrace()
      onOpenTradingHouse()
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    `${ns}_CloseTradingHouse`,
    EVENT_CLOSE_TRADING_HOUSE,
    function (this: void): undefined {
      onTradingHouseClosed()
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    `${ns}_CloseStore`,
    EVENT_CLOSE_STORE,
    function (this: void): undefined {
      markVenueClosed()
      flushJunkGate()
      releaseConfirmDialog()
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    `${ns}_CloseCraftingStation`,
    EVENT_END_CRAFTING_STATION_INTERACT,
    function (this: void): undefined {
      clearWritCraftQueue()
      releaseConfirmDialog()
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    `${ns}_QuestRemoved`,
    EVENT_QUEST_REMOVED,
    function (
      this: void,
      _eventCode: number,
      isCompleted: boolean,
      _journalIndex: number,
      _questName: string,
      zoneIndex: number,
      poiIndex: number,
      questID: number
    ): undefined {
      onQuestRemoved(isCompleted, zoneIndex, poiIndex, questID)
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    `${ns}_ScriptLockStateChanged`,
    EVENT_CRAFTED_ABILITY_SCRIPT_LOCK_STATE_CHANGED,
    function (this: void): undefined {
      invalidateScribingKnowledgeCache()
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    `${ns}_CraftCompleted`,
    EVENT_CRAFT_COMPLETED,
    onWritCraftCompleted
  )
}
