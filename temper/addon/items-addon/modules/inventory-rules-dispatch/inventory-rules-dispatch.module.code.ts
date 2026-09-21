import { dispatchListings } from "akasha/temper/addon/items-addon/modules/inventory-rules-list/inventory-rules-list.module.code.ts"
export function onOpenTradingHouse(): undefined {
  dispatchListings()
}
