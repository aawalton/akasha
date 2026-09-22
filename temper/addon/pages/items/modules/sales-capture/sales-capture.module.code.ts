import "akasha/temper/eso/type/eso-enums-06/eso-enums-06.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-07/eso-enums-07.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-08/eso-functions-08.type-declaration.d.ts"

import { lib as history } from "akasha/temper/addon/pages/items/guild-history/modules/sales-history-state/sales-history-state.module.code.ts"
import type { SalesPayload } from "akasha/temper/capture/sale/modules/sales-payload/sales-payload.module.code.ts"

interface GuildHistoryTraderEventInfo {
  sellerDisplayName: string
  buyerDisplayName: string
  quantity: number
  itemLink: string
  price: number
  tax: number
}

interface GuildHistoryEventRef {
  GetEventId: () => Id64
  GetEventType: () => number
  GetEventTimestampS: () => number
  GetEventInfo: () => GuildHistoryTraderEventInfo | undefined
}

interface GuildHistoryEventProcessor {
  SetEventCallback: (cb: (this: void, event: GuildHistoryEventRef) => void) => boolean
  SetStopOnLastCachedEvent: (stop: boolean) => boolean
  StartStreaming: (afterEventId?: Id64, onRegisteredForFuture?: (this: void) => void) => boolean
}

function asEventProcessor(value: unknown): GuildHistoryEventProcessor | undefined {
  return value as GuildHistoryEventProcessor | undefined
}

let getSavedVariables: (() => SalesPayload) | undefined

export function setSalesAccessor(accessor: () => SalesPayload): undefined {
  getSavedVariables = accessor
}

function recordSale(
  ownName: string,
  guildName: string,
  event: GuildHistoryEventRef,
  info: GuildHistoryTraderEventInfo
): undefined {
  if (info.sellerDisplayName !== ownName) return

  const accessor = getSavedVariables
  if (!accessor) return
  const sv = accessor()

  const saleId = Id64ToString(event.GetEventId())
  if (saleId === "") return

  let sales = sv.sales
  if (sales === undefined) {
    sales = {}
    sv.sales = sales
  }

  sales[saleId] = {
    saleId,
    itemLink: info.itemLink,
    itemName: GetItemLinkName(info.itemLink),
    itemId: GetItemLinkItemId(info.itemLink),
    quantity: info.quantity,
    price: info.price,
    tax: info.tax,
    buyerName: info.buyerDisplayName,
    guildName,
    soldAt: event.GetEventTimestampS(),
  }
}

export function startSalesCapture(addonName: string): undefined {
  const ownName = GetDisplayName()

  history.OnReady((ready) => {
    const numGuilds = GetNumGuilds()
    for (let i = 1; i <= numGuilds; i++) {
      const guildId = GetGuildId(i)
      const guildName = GetGuildName(guildId)
      const processor = asEventProcessor(
        ready.CreateGuildHistoryProcessor(guildId, GUILD_HISTORY_EVENT_CATEGORY_TRADER, addonName)
      )
      if (!processor) continue

      processor.SetStopOnLastCachedEvent(false)
      processor.SetEventCallback((event) => {
        if (event.GetEventType() !== GUILD_HISTORY_TRADER_EVENT_ITEM_SOLD) return
        const info = event.GetEventInfo()
        if (!info) return
        recordSale(ownName, guildName, event, info)
      })
      processor.StartStreaming()
    }
  })
}
