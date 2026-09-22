import { tooltipShow } from "akasha/temper/addon/pages/items/crafting-station/modules/craft-tooltips/craft-tooltips.module.code.ts"
import "akasha/temper/addon/pages/items/craft-decl-controls/craft-decl-controls.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-crafting-tooltips/eso-crafting-tooltips.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-01/eso-enums-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-07/eso-enums-07.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-03/eso-functions-03.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-04/eso-functions-04.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-05/eso-functions-05.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-06/eso-functions-06.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-08/eso-functions-08.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-3/eso-ui-3.type-declaration.d.ts"

export function tooltipHandler(): undefined {
  const origSetBagItem = ItemTooltip.SetBagItem
  ItemTooltip.SetBagItem = function (
    this: TooltipControl,
    bagId: number,
    slotIndex: number,
    displayFlags?: number
  ) {
    origSetBagItem.call(this, bagId, slotIndex, displayFlags)
    const itemLink = GetItemLink(bagId, slotIndex, LINK_STYLE_DEFAULT)
    const uID = GetItemUniqueId(bagId, slotIndex)
    tooltipShow(this, itemLink, uID !== undefined ? Id64ToString(uID) : undefined)
  }
  const origSetWornItem = ItemTooltip.SetWornItem
  ItemTooltip.SetWornItem = function (this: TooltipControl, slotIndex: number, ...rest: unknown[]) {
    origSetWornItem.call(this, slotIndex, ...rest)
    const itemLink = GetItemLink(BAG_WORN, slotIndex, LINK_STYLE_DEFAULT)
    const uID = GetItemUniqueId(BAG_WORN, slotIndex)
    tooltipShow(this, itemLink, uID !== undefined ? Id64ToString(uID) : undefined)
  }
  const origSetLootItem = ItemTooltip.SetLootItem
  ItemTooltip.SetLootItem = function (this: TooltipControl, lootId: number, ...rest: unknown[]) {
    origSetLootItem.call(this, lootId, ...rest)
    tooltipShow(this, GetLootItemLink(lootId, LINK_STYLE_DEFAULT))
  }
  const resultTooltip = ZO_SmithingTopLevelCreationPanelResultTooltip
  const origSetPendingSmithingItem = resultTooltip.SetPendingSmithingItem
  resultTooltip.SetPendingSmithingItem = function (
    this: SmithingResultTooltipControl,
    pid: number,
    mid: number,
    mq: number,
    sid: number,
    tid: number
  ) {
    origSetPendingSmithingItem.call(this, pid, mid, mq, sid, tid)
    tooltipShow(this, GetSmithingPatternResultLink(pid, mid, mq, sid, tid, LINK_STYLE_DEFAULT))
  }
  const origPopupSetLink = PopupTooltip.SetLink
  PopupTooltip.SetLink = function (this: TooltipControl, link: string, ...rest: unknown[]) {
    origPopupSetLink.call(this, link, ...rest)
    tooltipShow(this, link)
  }
  const origSetLink = ItemTooltip.SetLink
  ItemTooltip.SetLink = function (this: TooltipControl, link: string, ...rest: unknown[]) {
    origSetLink.call(this, link, ...rest)
    tooltipShow(this, link)
  }
  const origSetAttachedMailItem = ItemTooltip.SetAttachedMailItem
  ItemTooltip.SetAttachedMailItem = function (
    this: TooltipControl,
    openMailId: Id64,
    attachmentIndex: number,
    ...rest: unknown[]
  ) {
    origSetAttachedMailItem.call(this, openMailId, attachmentIndex, ...rest)
    tooltipShow(this, GetAttachedItemLink(openMailId, attachmentIndex, LINK_STYLE_DEFAULT))
  }
  const origSetBuybackItem = ItemTooltip.SetBuybackItem
  ItemTooltip.SetBuybackItem = function (this: TooltipControl, index: number, ...rest: unknown[]) {
    origSetBuybackItem.call(this, index, ...rest)
    tooltipShow(this, GetBuybackItemLink(index, LINK_STYLE_DEFAULT))
  }
  const origSetTradingHouseItem = ItemTooltip.SetTradingHouseItem
  ItemTooltip.SetTradingHouseItem = function (
    this: TooltipControl,
    tradingHouseIndex: number,
    ...rest: unknown[]
  ) {
    origSetTradingHouseItem.call(this, tradingHouseIndex, ...rest)
    tooltipShow(this, GetTradingHouseSearchResultItemLink(tradingHouseIndex, LINK_STYLE_DEFAULT))
  }
  const origSetTradingHouseListing = ItemTooltip.SetTradingHouseListing
  ItemTooltip.SetTradingHouseListing = function (
    this: TooltipControl,
    tradingHouseListingIndex: number,
    ...rest: unknown[]
  ) {
    origSetTradingHouseListing.call(this, tradingHouseListingIndex, ...rest)
    tooltipShow(this, GetTradingHouseListingItemLink(tradingHouseListingIndex, LINK_STYLE_DEFAULT))
  }
  const origSetTradeItem = ItemTooltip.SetTradeItem
  ItemTooltip.SetTradeItem = function (
    this: TooltipControl,
    tradeWho: number,
    slotIndex: number,
    ...rest: unknown[]
  ) {
    origSetTradeItem.call(this, tradeWho, slotIndex, ...rest)
    tooltipShow(this, GetTradeItemLink(tradeWho, slotIndex, LINK_STYLE_DEFAULT))
  }
  const origSetQuestReward = ItemTooltip.SetQuestReward
  ItemTooltip.SetQuestReward = function (
    this: TooltipControl,
    rewardIndex: number,
    ...rest: unknown[]
  ) {
    origSetQuestReward.call(this, rewardIndex, ...rest)
    tooltipShow(this, GetQuestRewardItemLink(rewardIndex, LINK_STYLE_DEFAULT))
  }
}
