import { getAlertsTooltipMessages } from "akasha/temper/addon/pages/world/antiquities/modules/leads-alerts/leads-alerts.module.code.ts"
import {
  LOCDATA_TYPE_FIXLOCATION,
  UNKNOWN,
} from "akasha/temper/addon/pages/world/antiquities/modules/leads-location-types/leads-location-types.module.code.ts"
import { LOCATIONS } from "akasha/temper/addon/pages/world/antiquities/modules/leads-locations/leads-locations.module.code.ts"
import {
  antiquityFound,
  getLastAntiquityFound,
} from "akasha/temper/addon/pages/world/antiquities/modules/leads-reporting/leads-reporting.module.code.ts"
import { SET_ID_TO_ITEM_ID } from "akasha/temper/addon/pages/world/antiquities/modules/leads-set-links/leads-set-links.module.code.ts"
import { STRINGS } from "akasha/temper/addon/pages/world/antiquities/modules/leads-ui-strings/leads-ui-strings.module.code.ts"
import { getColorCode } from "akasha/temper/addon/pages/world/antiquities/modules/leads-unit-colors/leads-unit-colors.module.code.ts"
import { getUnitList } from "akasha/temper/addon/pages/world/antiquities/modules/leads-unit-list/leads-unit-list.module.code.ts"
import {
  hidePopover,
  type PopoverLine,
  showPopover,
} from "akasha/temper/window/modules/window-popover/window-popover.module.code.ts"
import "akasha/temper/eso/type/eso-functions-07/eso-functions-07.type-declaration.d.ts"
import { paintRowHover } from "akasha/temper/window/modules/window-rows/window-rows.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/addon/pages/world/antiquities/leads-window-declarations/leads-window-declarations.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-08/eso-enums-08.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-19/eso-enums-19.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-08/eso-functions-08.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-09/eso-functions-09.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-3/eso-ui-3.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

const TIP_GAP = -5

const LOCATION_GAP = -25

function locationLine(this: void, antiquityId: number): PopoverLine {
  const entry = LOCATIONS[antiquityId]
  return { text: entry !== undefined ? entry.description : UNKNOWN }
}

function setLines(this: void, setId: number): PopoverLine[] {
  const itemId = SET_ID_TO_ITEM_ID[setId]
  if (itemId === undefined) return []
  const itemLink = string.format(
    "|H1:item:%d:%d:50:0:0:0:0:0:0:0:0:0:0:0:0:%d:%d:0:0:%d:0|h|h",
    itemId,
    ITEM_DISPLAY_QUALITY_ARTIFACT,
    ITEMSTYLE_NONE,
    0,
    10000
  )
  const [, bonus] = GetItemLinkSetBonusInfo(itemLink, false, 1)
  const armorType = GetItemLinkArmorType(itemLink)
  const equipType = GetString("SI_EQUIPTYPE", GetItemLinkEquipType(itemLink))
  const worn =
    armorType === 0
      ? zo_strformat("<<1>>", equipType)
      : zo_strformat("<<1>> <<2>>", GetString("SI_ARMORTYPE", armorType), equipType)
  return [{ text: worn, role: "label" }, { text: zo_strformat("<<1>>", bonus) }]
}

function leadLines(this: void, antiquityId: number, setId: number): PopoverLine[] {
  const [red, green, blue] = getColorCode(GetAntiquityQuality(antiquityId)).UnpackRGB()
  const lines: PopoverLine[] = [
    {
      text: zo_strformat("<<1>>", GetAntiquityName(antiquityId)),
      role: "heading",
      color: [red, green, blue],
    },
    {
      text: zo_strformat("<<1>>", GetZoneNameById(GetAntiquityZoneId(antiquityId))),
      role: "muted",
    },
    locationLine(antiquityId),
  ]
  const entry = LOCATIONS[antiquityId]
  if (entry !== undefined && entry.type === LOCDATA_TYPE_FIXLOCATION) {
    lines.push({ text: STRINGS.TOOLTIP_MAPPINS, role: "muted" })
  }
  lines.push(...setLines(setId))
  for (const line of STRINGS.TOOLTIP_INKLING) lines.push({ text: line, role: "hint" })
  return lines
}

export function headerMouseEnter(
  this: void,
  control: Control,
  tooltipIndex: number | undefined
): undefined {
  if (tooltipIndex === undefined) return undefined
  const text = STRINGS.SORTHEADER_TOOLTIP[tooltipIndex - 1]
  if (text !== undefined) showPopover(control, [text], RIGHT, TIP_GAP)
  return undefined
}

export function headerMouseExit(
  this: void,
  _control: Control,
  _tooltipIndex: number | undefined
): undefined {
  hidePopover()
  return undefined
}

export function rowMouseEnter(this: void, control: LeadsRowControl): undefined {
  const data = control.data
  if (data !== undefined) showPopover(control, leadLines(data.Aid, data.SetId), RIGHT, TIP_GAP)
  getUnitList().Row_OnMouseEnter(control)
  paintRowHover(control, true)
}

export function rowMouseExit(this: void, control: LeadsRowControl): undefined {
  hidePopover()
  getUnitList().Row_OnMouseExit(control)
  paintRowHover(control, false)
}

export function rowMouseUp(this: void, control: LeadsRowControl): undefined {
  const data = control.data
  if (data !== undefined) {
    antiquityFound(0, data.Aid)
  }
}

export function alertsMouseEnter(this: void, control: Control): undefined {
  showPopover(control, getAlertsTooltipMessages(), RIGHT, TIP_GAP)
  return undefined
}

export function alertsMouseExit(this: void, _control: Control): undefined {
  hidePopover()
  return undefined
}

export function locationBoxMouseEnter(this: void, control: Control): undefined {
  const lastFound = getLastAntiquityFound()
  if (lastFound !== 0) showPopover(control, [locationLine(lastFound)], RIGHT, LOCATION_GAP)
  return undefined
}

export function locationBoxMouseExit(this: void, _control: Control): undefined {
  hidePopover()
  return undefined
}
