import {
  FLAG_SHOW_ACCOUNTS,
  FLAG_SHOW_HEADER,
  FLAG_SHOW_PIECES,
} from "../item-browser-constants/item-browser-constants.module.code.ts"
import { getVars } from "../item-browser-state/item-browser-state.module.code.ts"
import { addTooltipExtension } from "../item-browser-tooltip-extension/item-browser-tooltip-extension.module.code.ts"

type LinkFn = (this: void, ...args: unknown[]) => string

let ARE_EXTERNAL_TOOLTIPS_HOOKED = false

function tooltipHook(
  this: void,
  control: object,
  functionName: string,
  linkFunction: LinkFn,
  flagMask?: number,
  sourceParams?: readonly string[]
): undefined {
  ZO_PostHook(control, functionName, (...hookArgs: unknown[]): undefined => {
    const vars = getVars()
    if (!vars.externalTooltips.enableExtension) {
      return undefined
    }

    let flags = FLAG_SHOW_HEADER
    if (vars.externalTooltips.showPieces > 0) {
      flags = BitOr(flags, FLAG_SHOW_PIECES)
    }
    if (vars.externalTooltips.showAccounts > 0) {
      flags = BitOr(flags, FLAG_SHOW_ACCOUNTS)
    }
    if (flagMask !== undefined) {
      flags = BitAnd(flags, flagMask)
    }

    const methodArgs: unknown[] = []
    for (const i of $range(1, hookArgs.length - 1)) {
      methodArgs.push(hookArgs[i])
    }

    let itemSource: { [param: string]: unknown } | undefined
    if (sourceParams !== undefined) {
      itemSource = {}
      for (const i of $range(1, sourceParams.length)) {
        const key = sourceParams[i - 1]
        if (key !== undefined) {
          itemSource[key] = methodArgs[i - 1]
        }
      }
    }

    addTooltipExtension(control, linkFunction(...methodArgs), undefined, flags, itemSource)
    return undefined
  })
  return undefined
}

const itemLinkPassthrough: LinkFn = (...args) => args[0] as string

export function hookExternalTooltips(this: void): undefined {
  if (ARE_EXTERNAL_TOOLTIPS_HOOKED || !getVars().externalTooltips.enableExtension) {
    return
  }
  ARE_EXTERNAL_TOOLTIPS_HOOKED = true

  tooltipHook(PopupTooltip, "SetLink", itemLinkPassthrough)
  tooltipHook(ItemTooltip, "SetLink", itemLinkPassthrough)
  tooltipHook(ItemTooltip, "SetWornItem", (...args) =>
    GetItemLink(args[1] as number, args[0] as number)
  )
  tooltipHook(
    ItemTooltip,
    "SetBagItem",
    (...args) => GetItemLink(args[0] as number, args[1] as number),
    undefined,
    ["bagId", "slotIndex"]
  )
  tooltipHook(
    ItemTooltip,
    "SetTradeItem",
    (...args) => GetTradeItemLink(args[0] as number, args[1] as number, LINK_STYLE_DEFAULT),
    undefined,
    ["who", "tradeIndex"]
  )
  tooltipHook(ItemTooltip, "SetBuybackItem", (...args) =>
    GetBuybackItemLink(args[0] as number, LINK_STYLE_DEFAULT)
  )
  tooltipHook(ItemTooltip, "SetStoreItem", (...args) =>
    GetStoreItemLink(args[0] as number, LINK_STYLE_DEFAULT)
  )
  tooltipHook(ItemTooltip, "SetAttachedMailItem", (...args) =>
    GetAttachedItemLink(args[0] as Id64, args[1] as number, LINK_STYLE_DEFAULT)
  )
  tooltipHook(
    ItemTooltip,
    "SetLootItem",
    (...args) => GetLootItemLink(args[0] as number, LINK_STYLE_DEFAULT),
    undefined,
    ["lootId"]
  )
  tooltipHook(ItemTooltip, "SetReward", (...args) =>
    GetItemRewardItemLink(
      args[0] as number,
      args[1] as number,
      args[2] as number,
      LINK_STYLE_DEFAULT
    )
  )
  tooltipHook(ItemTooltip, "SetQuestReward", (...args) =>
    GetQuestRewardItemLink(args[0] as number, LINK_STYLE_DEFAULT)
  )
  tooltipHook(ItemTooltip, "SetTradingHouseItem", (...args) =>
    GetTradingHouseSearchResultItemLink(args[0] as number, LINK_STYLE_DEFAULT)
  )
  tooltipHook(ItemTooltip, "SetTradingHouseListing", (...args) =>
    GetTradingHouseListingItemLink(args[0] as number, LINK_STYLE_DEFAULT)
  )
  tooltipHook(ItemTooltip, "SetItemSetCollectionPieceLink", itemLinkPassthrough, FLAG_SHOW_ACCOUNTS)
  return undefined
}
