import "akasha/temper/eso/type/eso-api/eso-api.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-01/eso-enums-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-09/eso-enums-09.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-19/eso-enums-19.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-02/eso-functions-02.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-08/eso-functions-08.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-interface-extra-2/eso-interface-extra-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-interface-extra-4/eso-interface-extra-4.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-objects-02/eso-objects-02.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ttc/eso-ttc.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-2/eso-ui-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-3/eso-ui-3.type-declaration.d.ts"
import {
  TEXT_PRIMARY,
  TEXT_SECONDARY,
} from "akasha/design/interface/token/modules/text-color/text-color.module.code.ts"
import { ADDON_NAME } from "akasha/temper/addon/pages/items/modules/trading-constants/trading-constants.module.code.ts"
import {
  getLastSold,
  putLastSold,
} from "akasha/temper/addon/pages/items/modules/trading-sell-price-store/trading-sell-price-store.module.code.ts"
import {
  createSellFlow,
  type SellFlow,
} from "akasha/temper/addon/shared/modules/guild-store-poster/guild-store-poster.module.code.ts"
import {
  getItemPriceKey,
  suggestSellPrice,
} from "akasha/temper/economy/trading/listing/modules/sell-pricing/sell-pricing.module.code.ts"
import {
  CONTROL_HEIGHT,
  createBarButton,
  PADDING_X,
  PADDING_Y,
} from "akasha/temper/items/filters/addon/modules/filter-bar-controls/filter-bar-controls.module.code.ts"
import {
  FRAME_PADDING,
  FRAME_TOP,
  frameWindow,
} from "akasha/temper/window/modules/window-frame/window-frame.module.code.ts"
import "akasha/temper/eso/type/eso-event-manager/eso-event-manager.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-events/eso-events.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-03/eso-functions-03.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"

const DIFFERENT_QUALITY_ITEMTYPES: Record<number, true> = {
  [ITEMTYPE_GLYPH_ARMOR]: true,
  [ITEMTYPE_GLYPH_JEWELRY]: true,
  [ITEMTYPE_GLYPH_WEAPON]: true,
  [ITEMTYPE_DRINK]: true,
  [ITEMTYPE_FOOD]: true,
}

const WINDOW_NAME = "TemperItemsListingsSell"
const WINDOW_WIDTH = 320
const LINE_HEIGHT = 20
const LINE_GAP = 4
const BUTTON_HEIGHT = CONTROL_HEIGHT
const WINDOW_TITLE = "Sell Price"
const INSET_X = FRAME_PADDING - PADDING_X
const INSET_Y = FRAME_TOP - PADDING_Y

const SOURCE_LABEL: Record<string, string> = {
  "last-sold": "last sold",
  ttc: "TTC market",
  "vendor-multiple": "3x vendor",
}

export interface SellHelper {
  register: (this: void) => undefined
}

export function createSellHelper(this: void): SellHelper {
  return {
    register(): undefined {
      mountSellHelper()
    },
  }
}

interface SellWidgets {
  readonly tlw: TopLevelWindow
  readonly nameLabel: LabelControl
  readonly priceLabel: LabelControl
  readonly feeLabel: LabelControl
  readonly button: ButtonControl
  readonly buttonLabel: LabelControl
}

function mountSellHelper(this: void): undefined {
  const ns = `${ADDON_NAME}_Sell`
  const flow = createSellFlow(ADDON_NAME)
  const widgets = buildSellWindow()

  EVENT_MANAGER.RegisterForEvent(
    `${ns}_Pending`,
    EVENT_TRADING_HOUSE_PENDING_ITEM_UPDATE,
    function (this: void, _eventCode: number, _slotId: number, isPending: boolean): undefined {
      if (!isPending) {
        widgets.tlw.SetHidden(true)
        return
      }
      onItemStaged(widgets, flow)
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    `${ns}_Close`,
    EVENT_CLOSE_TRADING_HOUSE,
    function (this: void): undefined {
      widgets.tlw.SetHidden(true)
    }
  )
}

function onItemStaged(this: void, widgets: SellWidgets, flow: SellFlow): undefined {
  const [bag, slot, quantity] = GetPendingItemPost()

  const itemLink = GetItemLink(bag, slot, LINK_STYLE_DEFAULT)
  const [itemType] = GetItemLinkItemType(itemLink)
  const vendorValue = GetItemSellValueWithBonuses(bag, slot)
  const hasDifferentQualities = DIFFERENT_QUALITY_ITEMTYPES[itemType] === true

  const key = getItemPriceKey({ itemLink, itemType, hasDifferentQualities })
  const last = getLastSold(key)
  const ttcMarketPpu = readTtcPrice(itemLink)

  const suggestion = suggestSellPrice({
    lastSoldPpu: last?.pricePerUnit,
    ttcMarketPpu,
    vendorValue,
  })
  const ppu = suggestion.pricePerUnit
  const total = ppu * quantity

  const [listingFee, , expectedProfit] = GetTradingHousePostPriceInfo(total)

  const itemName = zo_strformat("<<1>>", GetItemName(bag, slot))
  widgets.nameLabel.SetText(`${itemName}  (x${quantity})`)
  widgets.priceLabel.SetText(
    `${ZO_CommaDelimitNumber(zo_round(ppu))}/ea  (${SOURCE_LABEL[suggestion.source] ?? suggestion.source})`
  )
  widgets.feeLabel.SetText(
    `Total ${ZO_CommaDelimitNumber(zo_round(total))}  •  fee ${ZO_CommaDelimitNumber(zo_round(listingFee))}  •  profit ${ZO_CommaDelimitNumber(zo_round(expectedProfit))}`
  )
  widgets.buttonLabel.SetText(`List for ${ZO_CommaDelimitNumber(zo_round(ppu))} each`)

  widgets.button.SetHandler("OnClicked", function (this: void): undefined {
    flow.postItem(bag, slot, quantity, total, function (this: void, ok: boolean): undefined {
      if (ok) {
        putLastSold(key, quantity, ppu)
        widgets.tlw.SetHidden(true)
      } else {
        d(`[${ADDON_NAME}] sell helper: post did not complete.`)
      }
    })
  })

  widgets.tlw.SetHidden(false)
}

function readTtcPrice(this: void, itemLink: string): number | undefined {
  if (TamrielTradeCentrePrice === undefined) return undefined
  const info = TamrielTradeCentrePrice.GetPriceInfo(itemLink)
  if (info === undefined) return undefined
  return info.SuggestedPrice ?? info.Avg
}

function buildSellWindow(this: void): SellWidgets {
  const existing = WINDOW_MANAGER.GetControlByName<TopLevelWindow>(WINDOW_NAME)
  if (existing !== undefined) existing.SetHidden(true)

  const tlw = WINDOW_MANAGER.CreateTopLevelWindow(WINDOW_NAME)
  tlw.SetHidden(true)
  tlw.SetClampedToScreen(true)
  tlw.SetMovable(true)

  frameWindow(tlw, WINDOW_TITLE, function (this: void): undefined {
    tlw.SetHidden(true)
  })
  const content = WINDOW_MANAGER.CreateControl(`${WINDOW_NAME}Content`, tlw, CT_CONTROL)
  content.SetAnchor(TOPLEFT, tlw, TOPLEFT, INSET_X, INSET_Y)
  content.SetAnchor(BOTTOMRIGHT, tlw, BOTTOMRIGHT, -INSET_X, 0)

  let y = PADDING_Y
  const nameLabel = buildLine(content, "Name", y, true)
  y += LINE_HEIGHT + LINE_GAP
  const priceLabel = buildLine(content, "Price", y, false)
  y += LINE_HEIGHT + LINE_GAP
  const feeLabel = buildLine(content, "Fee", y, false)
  y += LINE_HEIGHT + LINE_GAP

  const btn = createBarButton(
    content,
    `${WINDOW_NAME}List`,
    "List",
    PADDING_X,
    WINDOW_WIDTH - PADDING_X * 2
  )
  btn.backdrop.ClearAnchors()
  btn.backdrop.SetAnchor(TOPLEFT, content, TOPLEFT, PADDING_X, y)
  btn.backdrop.SetDimensions(WINDOW_WIDTH - PADDING_X * 2, BUTTON_HEIGHT)
  btn.button.ClearAnchors()
  btn.button.SetAnchor(TOPLEFT, btn.backdrop, TOPLEFT, 0, 0)
  btn.button.SetAnchor(BOTTOMRIGHT, btn.backdrop, BOTTOMRIGHT, 0, 0)
  y += BUTTON_HEIGHT

  tlw.SetDimensions(WINDOW_WIDTH + INSET_X * 2, INSET_Y + y + FRAME_PADDING)
  tlw.ClearAnchors()
  tlw.SetAnchor(TOPLEFT, GuiRoot, TOPLEFT, 80, 400)

  return {
    tlw,
    nameLabel,
    priceLabel,
    feeLabel,
    button: btn.button,
    buttonLabel: btn.label,
  }
}

function buildLine(
  this: void,
  parent: Control,
  suffix: string,
  top: number,
  bold: boolean
): LabelControl {
  const label = WINDOW_MANAGER.CreateControl(`${WINDOW_NAME}${suffix}`, parent, CT_LABEL)
  label.SetAnchor(TOPLEFT, parent, TOPLEFT, PADDING_X, top)
  label.SetDimensions(WINDOW_WIDTH - PADDING_X * 2, LINE_HEIGHT)
  label.SetFont(bold ? "$(BOLD_FONT)|16|shadow" : "$(MEDIUM_FONT)|14|soft-shadow-thin")
  const color = bold ? TEXT_SECONDARY : TEXT_PRIMARY
  label.SetColor(color[0], color[1], color[2], 1)
  label.SetHorizontalAlignment(TEXT_ALIGN_LEFT)
  return label
}
