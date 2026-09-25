import "akasha/temper/eso/type/eso-enums-01/eso-enums-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-14/eso-enums-14.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-19/eso-enums-19.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-event-manager/eso-event-manager.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-events/eso-events.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-03/eso-functions-03.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-08/eso-functions-08.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-09/eso-functions-09.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-interface-extra-4/eso-interface-extra-4.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-2/eso-ui-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-3/eso-ui-3.type-declaration.d.ts"
import type { BrowseResultListing } from "akasha/temper/addon/pages/items/modules/trading-browse-engine/trading-browse-engine.module.code.ts"
import { PADDING_X } from "akasha/temper/items/filters/addon/modules/filter-bar-controls/filter-bar-controls.module.code.ts"
import {
  styleText,
  type TextRole,
} from "akasha/temper/window/modules/text-style/text-style.module.code.ts"
import {
  HEADER_ROW_HEIGHT,
  LINE_HEIGHT,
  paintRowHover,
  STAT_ROW_HEIGHT,
} from "akasha/temper/window/modules/window-rows/window-rows.module.code.ts"

export const ROW_HEIGHT = STAT_ROW_HEIGHT
export const ROW_GAP = 0
export const HEADER_HEIGHT = HEADER_ROW_HEIGHT

const COL_NAME_X = PADDING_X
const COL_UNIT_X = PADDING_X + 300
const COL_TOTAL_X = PADDING_X + 400
const COL_SELLER_X = PADDING_X + 500
const COL_GUILD_X = PADDING_X + 650
export const LIST_WIDTH = COL_GUILD_X + 180 + PADDING_X

const SELLER_PLACEHOLDER = "—"

export interface ResultRow {
  readonly container: Control
  readonly name: LabelControl
  readonly unit: LabelControl
  readonly total: LabelControl
  readonly seller: LabelControl
  readonly guild: LabelControl
}

function makeColumnLabel(
  parent: Control,
  name: string,
  xOffset: number,
  width: number,
  role: TextRole
): LabelControl {
  const label = WINDOW_MANAGER.CreateControl(name, parent, CT_LABEL)
  label.SetAnchor(LEFT, parent, LEFT, xOffset, 0)
  label.SetDimensions(width, LINE_HEIGHT)
  styleText(label, role)
  label.SetHorizontalAlignment(TEXT_ALIGN_LEFT)
  return label
}

export function buildHeader(parent: Control, listName: string, topOffset: number): Control {
  const header = WINDOW_MANAGER.CreateControl(`${listName}Header`, parent, CT_CONTROL)
  header.SetAnchor(TOPLEFT, parent, TOPLEFT, 0, topOffset)
  header.SetDimensions(LIST_WIDTH, HEADER_HEIGHT)
  makeColumnLabel(header, `${listName}HdrName`, COL_NAME_X, 300, "label").SetText("Item")
  makeColumnLabel(header, `${listName}HdrUnit`, COL_UNIT_X, 100, "label").SetText("Unit")
  makeColumnLabel(header, `${listName}HdrTotal`, COL_TOTAL_X, 100, "label").SetText("Total")
  makeColumnLabel(header, `${listName}HdrSeller`, COL_SELLER_X, 150, "label").SetText("Seller")
  makeColumnLabel(header, `${listName}HdrGuild`, COL_GUILD_X, 180, "label").SetText("Guild")
  return header
}

export function buildRow(
  parent: Control,
  listName: string,
  slotIndex: number,
  topOffset: number
): ResultRow {
  const y = topOffset + slotIndex * (ROW_HEIGHT + ROW_GAP)
  const prefix = `${listName}Row${slotIndex}`
  const container = WINDOW_MANAGER.CreateControl(prefix, parent, CT_CONTROL)
  container.SetAnchor(TOPLEFT, parent, TOPLEFT, 0, y)
  container.SetDimensions(LIST_WIDTH, ROW_HEIGHT)
  container.SetHidden(true)
  container.SetMouseEnabled(true)
  container.SetHandler("OnMouseEnter", function (this: void): undefined {
    paintRowHover(container, true)
  })
  container.SetHandler("OnMouseExit", function (this: void): undefined {
    paintRowHover(container, false)
  })
  return {
    container,
    name: makeColumnLabel(container, `${prefix}Name`, COL_NAME_X, 300, "body"),
    unit: makeColumnLabel(container, `${prefix}Unit`, COL_UNIT_X, 100, "number"),
    total: makeColumnLabel(container, `${prefix}Total`, COL_TOTAL_X, 100, "number"),
    seller: makeColumnLabel(container, `${prefix}Seller`, COL_SELLER_X, 150, "body"),
    guild: makeColumnLabel(container, `${prefix}Guild`, COL_GUILD_X, 180, "muted"),
  }
}

export function paintRow(row: ResultRow, listing: BrowseResultListing): undefined {
  row.name.SetText(listing.facts.itemName)
  row.unit.SetText(ZO_CommaDelimitNumber(zo_round(listing.pricePerUnit)))
  row.total.SetText(ZO_CommaDelimitNumber(listing.totalPrice))
  row.seller.SetText(listing.sellerName !== "" ? listing.sellerName : SELLER_PLACEHOLDER)
  row.guild.SetText(zo_strformat("<<1>>", GetGuildName(listing.guildId)))
  row.container.SetHidden(false)
}

export function hideRow(row: ResultRow): undefined {
  paintRowHover(row.container, false)
  row.container.SetHidden(true)
}
