import { dispatchGuildBuyShortfall } from "akasha/temper/addon/pages/items/modules/inventory-rules-dispatch-guild-buy/inventory-rules-dispatch-guild-buy.module.code.ts"
import { dispatchListings } from "akasha/temper/addon/pages/items/modules/inventory-rules-list/inventory-rules-list.module.code.ts"
export function onOpenTradingHouse(): undefined {
  dispatchListings(dispatchGuildBuyShortfall)
}
