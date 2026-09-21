import { dispatchListings } from "akasha/temper/addon/pages/items/modules/inventory-rules-list/inventory-rules-list.module.code.ts"
export function onOpenTradingHouse(): undefined {
  dispatchListings()
}
