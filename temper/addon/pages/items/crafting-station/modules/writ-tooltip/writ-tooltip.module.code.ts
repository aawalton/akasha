import {
  toMatKnowList,
  toVoucherCount,
} from "akasha/temper/addon/pages/items/crafting-station/modules/writ-parser-dispatch/writ-parser-dispatch.module.code.ts"
import {
  canDumpMatlist,
  canShowCMWDuplicates,
  knowTooltipText,
  matHaveCtTooltipText,
  matTooltipText,
  type TooltipTarget,
  tooltipVars,
} from "akasha/temper/addon/pages/items/crafting-station/modules/writ-tooltip-text/writ-tooltip-text.module.code.ts"
import type {
  KnowList,
  MatList,
  Parser,
} from "akasha/temper/addon/pages/items/crafting-station/modules/writ-types/writ-types.module.code.ts"
import "akasha/temper/addon/pages/items/crafting-station/modules/writ-public-api/writ-public-api.module.code.ts"
import "akasha/temper/addon/pages/items/craft-decl-controls/craft-decl-controls.type-declaration.d.ts"
import "akasha/temper/addon/pages/items/crafting-station/writ-global/writ-global.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-api-2/eso-api-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-01/eso-enums-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-09/eso-enums-09.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-03/eso-functions-03.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-04/eso-functions-04.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-08/eso-functions-08.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-3/eso-ui-3.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-writ-tooltip/eso-writ-tooltip.type-declaration.d.ts"

interface AssemblerParser extends Parser {
  WarningText: (this: Parser) => string | undefined
}

function parserHasWarningText(this: void, parser: Parser): parser is AssemblerParser {
  return "WarningText" in parser && parser.WarningText !== undefined
}

export function tooltipInsertOurText<S = unknown>(
  this: void,
  control: TooltipTarget<S>,
  itemLink: string,
  purchaseGold?: number,
  style?: S
): undefined {
  const [itemType] = GetItemLinkItemType(itemLink)
  if (ITEMTYPE_MASTER_WRIT !== itemType) {
    return
  }

  const [matList, knowList, parser] = toMatKnowList(itemLink)
  if (parser === undefined) {
    return
  }
  const voucherCt = toVoucherCount(itemLink)
  const matText = matTooltipText(matList, purchaseGold, voucherCt)
  if (matText === undefined) {
    return
  }
  if (tooltipVars().enable_mat_price_tooltip !== false) {
    control.AddLine(matText, style)
  }

  if (canDumpMatlist(tooltipVars().enable_mat_list_chat, parser)) {
    listDumpFromGlobal(matList)
  }
  const matHaveText = matHaveCtTooltipText(matList)
  if (matHaveText !== undefined) {
    control.AddLine(matHaveText, style)
  }
  const knowText = knowTooltipText(knowList)
  if (knowText !== undefined) {
    control.AddLine(knowText, style)
  }
  const warningText = parserHasWarningText(parser) ? parser.WarningText() : undefined
  if (warningText !== undefined) {
    control.AddLine(warningText, style)
  }
}

function listDumpFromGlobal(this: void, matList: MatList | undefined): undefined {
  const matRow = TemperWrit.MatRow
  if (matRow?.ListDump !== undefined) {
    matRow.ListDump(matList)
  }
}

export function knowDump(this: void, knowList: KnowList | undefined): undefined {
  if (knowList === undefined) {
    return undefined
  }
  for (const know of knowList) {
    d(know.DebugText())
  }
  return undefined
}

export function tooltipInterceptInstall(this: void): undefined {
  const ttBag = ItemTooltip.SetBagItem
  ItemTooltip.SetBagItem = function (
    this: TooltipControl,
    bagId: number,
    slotIndex: number,
    displayFlags?: number
  ) {
    ttBag.call(this, bagId, slotIndex, displayFlags)
    tooltipInsertOurText(
      this as TooltipTarget<string>,
      GetItemLink(bagId, slotIndex, LINK_STYLE_DEFAULT)
    )
  }

  const ttLoot = ItemTooltip.SetLootItem
  ItemTooltip.SetLootItem = function (this: TooltipControl, lootId: number, ...rest: unknown[]) {
    ttLoot.call(this, lootId, ...rest)
    tooltipInsertOurText(this as TooltipTarget<string>, GetLootItemLink(lootId, LINK_STYLE_DEFAULT))
  }

  const ttPopup = PopupTooltip.SetLink
  PopupTooltip.SetLink = function (this: TooltipControl, link: string, ...rest: unknown[]) {
    ttPopup.call(this, link, ...rest)
    tooltipInsertOurText(this as TooltipTarget<string>, link)
  }

  const setupTradingHouseItemTooltipHook = (): undefined => {
    const ttTrade = ItemTooltip.SetTradingHouseItem
    ItemTooltip.SetTradingHouseItem = function (
      this: TooltipControl,
      tradingHouseIndex: number,
      ...rest: unknown[]
    ) {
      ttTrade.call(this, tradingHouseIndex, ...rest)
      const [, , , , , , purchaseGold] = GetTradingHouseSearchResultItemInfo(tradingHouseIndex)
      tooltipInsertOurText(
        this as TooltipTarget<string>,
        GetTradingHouseSearchResultItemLink(tradingHouseIndex, LINK_STYLE_DEFAULT),
        purchaseGold
      )
    }
  }

  setupTradingHouseItemTooltipHook()

  const setupGamepadTooltip = (): undefined => {
    const leftGamepadTooltip = GAMEPAD_TOOLTIPS.GetTooltip(GAMEPAD_LEFT_TOOLTIP)
    ZO_PostHook(
      leftGamepadTooltip,
      "LayoutMasterWritItem",
      (self: WritGamepadTooltip, itemLink: string) => {
        const section = self.AcquireSection(self.GetStyle("bodySection"))
        tooltipInsertOurText(
          section as TooltipTarget<unknown>,
          itemLink,
          undefined,
          self.GetStyle("bodyDescription")
        )
        self.AddSection(section)
      }
    )
  }

  setupGamepadTooltip()
}

TemperWrit.TooltipInsertOurText = tooltipInsertOurText
TemperWrit.TooltipInterceptInstall = tooltipInterceptInstall
TemperWrit.MatTooltipText = matTooltipText
TemperWrit.KnowTooltipText = knowTooltipText
TemperWrit.MatHaveCtTooltipText = matHaveCtTooltipText
TemperWrit.CanShowCMWDuplicates = canShowCMWDuplicates
TemperWrit.KnowDump = knowDump
