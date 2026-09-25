import { buildLocationTooltipLines } from "akasha/temper/addon/pages/items/modules/inventory-location-tooltip-lines/inventory-location-tooltip-lines.module.code.ts"
import { getDatabase } from "akasha/temper/addon/pages/items/modules/inventory-saved-variables-ref/inventory-saved-variables-ref.module.code.ts"
import { buildItemCentricInventory } from "akasha/temper/items/core/modules/item-centric-inventory/item-centric-inventory.module.code.ts"
import {
  addTooltipLines,
  markedText,
  type TooltipItem,
  type TooltipLine,
} from "akasha/temper/window/modules/tooltip-lines/tooltip-lines.module.code.ts"
import "akasha/temper/eso/type/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-19/eso-enums-19.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-08/eso-functions-08.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-objects-01/eso-objects-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-2/eso-ui-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-3/eso-ui-3.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

const FRAME_NAME = "TemperItemsLocationTooltip"
const FRAME_PADDING = 8
const FRAME_FALLBACK_WIDTH = 320

let frameBackdrop: BackdropControl | undefined
let frameLabel: LabelControl | undefined

function ensureFrame(): LabelControl {
  if (frameLabel !== undefined) return frameLabel

  const backdrop = CreateControlFromVirtual<BackdropControl>(
    FRAME_NAME,
    GuiRoot,
    "ZO_DefaultBackdrop"
  )
  backdrop.SetDrawTier(DT_HIGH)
  backdrop.SetHidden(true)

  const label = WINDOW_MANAGER.CreateControl(`${FRAME_NAME}Label`, backdrop, CT_LABEL)
  label.SetFont("ZoFontGame")
  label.SetColor(1, 1, 1)
  label.SetWrapMode(TEXT_WRAP_MODE_ELLIPSIS)
  label.SetAnchor(TOPLEFT, backdrop, TOPLEFT, FRAME_PADDING, FRAME_PADDING)

  frameBackdrop = backdrop
  frameLabel = label
  return label
}

export function hideLocationBreakdown(): undefined {
  if (frameBackdrop !== undefined) frameBackdrop.SetHidden(true)
}

export function showLocationBreakdown(anchorTo: Control, itemId: number): undefined {
  if (itemId <= 0) {
    hideLocationBreakdown()
    return
  }
  const inventory = buildItemCentricInventory(getDatabase())
  const lines = buildLocationTooltipLines(inventory.get(itemId))
  if (lines.length === 0) {
    hideLocationBreakdown()
    return
  }

  const label = ensureFrame()
  const backdrop = frameBackdrop
  if (backdrop === undefined) return

  const anchorWidth = anchorTo.GetWidth()
  const width = anchorWidth > 0 ? anchorWidth : FRAME_FALLBACK_WIDTH

  const text = lines.map((line) => markedText(line)).join("\n")
  label.SetWidth(width - 2 * FRAME_PADDING)
  label.SetText(text)
  const height = label.GetTextHeight() + 2 * FRAME_PADDING

  backdrop.SetDimensions(width, height)
  backdrop.ClearAnchors()
  const fitsBelow = anchorTo.GetBottom() + height <= GuiRoot.GetHeight()
  if (fitsBelow) backdrop.SetAnchor(TOP, anchorTo, BOTTOM, 0, 0)
  else backdrop.SetAnchor(BOTTOM, anchorTo, TOP, 0, 0)
  backdrop.SetHidden(false)
}

function locationLines(this: void, item: TooltipItem): readonly TooltipLine[] {
  const itemId = GetItemLinkItemId(item.link)
  if (itemId <= 0) return []
  return buildLocationTooltipLines(buildItemCentricInventory(getDatabase()).get(itemId))
}

export function registerLocationTooltip(): undefined {
  addTooltipLines(locationLines)
}
