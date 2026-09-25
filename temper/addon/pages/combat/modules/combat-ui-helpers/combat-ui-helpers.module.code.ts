import { isObjectRecord } from "akasha/code/type/narrowing/modules/is-object-record/is-object-record.module.code.ts"
import type { UpdatableControl } from "akasha/temper/addon/pages/combat/modules/combat-ui-state/combat-ui-state.module.code.ts"
import {
  hidePopover,
  showPopover,
} from "akasha/temper/window/modules/window-popover/window-popover.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/design/language/lua-compiler/language-extensions/language-extensions.type-declaration.d.ts"
import "akasha/temper/addon/pages/combat/combat-public-api-declarations/combat-public-api-declarations.type-declaration.d.ts"
import "akasha/temper/addon/pages/combat/modules/combat-public-api/combat-public-api.module.code.ts"
import "akasha/temper/addon/pages/combat/combat-ui-state-declarations/combat-ui-state-declarations.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-07/eso-enums-07.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-08/eso-enums-08.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-08/eso-functions-08.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-map-ui/eso-map-ui.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-objects-01/eso-objects-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-objects-02/eso-objects-02.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-2/eso-ui-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-3/eso-ui-3.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

const SUB_ID_TO_QUALITY: Record<number, number> = {}

function parseLuaCapture(captured: string | undefined): string | undefined {
  return captured
}

export function getEnchantQuality(this: void, itemLink: string): number {
  const [itemIdCapture, itemIdSubCapture, enchantSubCapture] = string.match(
    itemLink,
    "|H[^:]+:item:([^:]+):([^:]+):[^:]+:[^:]+:([^:]+):"
  )
  const itemId = parseLuaCapture(itemIdCapture)
  const itemIdSub = parseLuaCapture(itemIdSubCapture)
  const enchantSubRaw = parseLuaCapture(enchantSubCapture)
  if (itemId == null) {
    return 0
  }

  let enchantSub = tonumber(enchantSubRaw) ?? 0

  if (enchantSub === 0 && !IsItemLinkCrafted(itemLink)) {
    const [hasSet] = GetItemLinkSetInfo(itemLink, false)
    if (hasSet) {
      enchantSub = tonumber(itemIdSub) ?? 0
    }
  }

  if (enchantSub > 0) {
    let quality = SUB_ID_TO_QUALITY[enchantSub]

    if (quality == null) {
      const fakeLink = string.format(
        "|H1:item:%i:%i:50:0:0:0:0:0:0:0:0:0:0:0:0:1:1:0:0:10000:0|h|h",
        itemId,
        enchantSub
      )
      quality = GetItemLinkDisplayQuality(fakeLink) ?? 0
      SUB_ID_TO_QUALITY[enchantSub] = quality
    }

    return quality
  }

  return 0
}

export const ARMOR_COLORS: Record<number, [number, number, number, number]> = {
  [ARMORTYPE_NONE]: [1, 1, 1, 1],
  [ARMORTYPE_HEAVY]: [1, 0.3, 0.3, 1],
  [ARMORTYPE_MEDIUM]: [0.3, 1, 0.3, 1],
  [ARMORTYPE_LIGHT]: [0.3, 0.3, 1, 1],
}

export function testEnchant(this: void, itemLink: string): undefined {
  const enchantId = GetItemLinkDefaultEnchantId(itemLink)
  const itemId = GetItemLinkItemId(itemLink)
  const itemName = GetItemLinkName(itemLink)
  df("%s (%d): EnchantID = %d", itemName, itemId, enchantId)
  return undefined
}

export function isNonNullObject<T>(this: void, value: unknown): value is T {
  return isObjectRecord(value)
}
const SIGIL_ABILITIES: Record<number, boolean> = {
  [236960]: true,
  [236968]: true,
  [236994]: true,
  [237014]: true,
}

export function isSigilAbility(this: void, buffAbilityIds: unknown): boolean {
  if (!isNonNullObject<Record<number, unknown>>(buffAbilityIds)) {
    return false
  }

  for (const [abilityId] of pairs(buffAbilityIds)) {
    if (SIGIL_ABILITIES[abilityId] === true) {
      return true
    }
  }

  return false
}

export function searchtable(
  this: void,
  t: Record<number, unknown>,
  field: string | undefined,
  value: unknown
): LuaMultiReturn<[boolean, unknown]> {
  if (value == null) {
    return $multi(false, undefined)
  }

  for (const [k, v] of pairs(t)) {
    if (field != null && isObjectRecord(v)) {
      if (v[field] === value) {
        return $multi(true, k)
      }
    } else if (v === value) {
      return $multi(true, k)
    }
  }

  return $multi(false, undefined)
}

export type LayoutAnchor = [number, Control | undefined, number, number, number, number]

export interface LayoutControl extends Control {
  sizes?: [number, number]
  anchors?: (LayoutAnchor | undefined)[]
  font?: [string, string | number, string]
  SetFont?: (this: Control, font: string) => void
}

export function storeOrigLayout(this: void, control: LayoutControl): undefined {
  const [width, height] = control.GetDimensions()
  control.sizes = [width, height]
  const anchors: (LayoutAnchor | undefined)[] = []
  control.anchors = anchors

  for (let i = 1; i <= 2; i++) {
    const [valid, point, relativeTo, relativePoint, x, y, constrains] = control.GetAnchor(i - 1)

    if (valid) {
      anchors[i - 1] = [point, relativeTo, relativePoint, x, y, constrains]
    }
  }

  for (let i = 1; i <= control.GetNumChildren(); i++) {
    const child = control.GetChild<LayoutControl>(i)
    if (child != null) {
      storeOrigLayout(child)
    }
  }
  return undefined
}

export function toggleFightList(this: void, panel?: UpdatableControl, show?: boolean): undefined {
  const list = panel ?? TemperCombat_Report_FightList
  const shouldShow = show === true ? true : list.IsHidden()
  list.SetHidden(!shouldShow)
  if (shouldShow) {
    list.Update?.(list)
  }

  const infoRow = list.GetParent()?.GetNamedChild<UpdatableControl>("_InfoRow")
  infoRow?.Update?.(infoRow)
  return undefined
}

export function adjustSlider(this: void, control: Control): undefined {
  const buffer = control.GetNamedChild<TextBufferControl & Control>("Buffer")
  const slider = control.GetNamedChild<SliderControl & Control>("Slider")
  if (buffer == null || slider == null) {
    return undefined
  }

  const numHistoryLines = buffer.GetNumHistoryLines()
  const numVisHistoryLines = buffer.GetNumVisibleLines()

  const [, sliderMax] = slider.GetMinMax()
  const sliderValue = slider.GetValue()

  slider.SetMinMax(numVisHistoryLines, numHistoryLines)

  if (sliderValue === sliderMax) {
    slider.SetValue(numHistoryLines)
  } else if (numHistoryLines === buffer.GetMaxHistoryLines()) {
    slider.SetValue(sliderValue - 1)
  }

  if (numHistoryLines > numVisHistoryLines) {
    slider.SetHidden(false)
    slider.SetThumbTextureHeight(
      zo_max(20, zo_floor((numVisHistoryLines / numHistoryLines) * slider.GetHeight()))
    )
  } else {
    slider.SetHidden(true)
  }
  return undefined
}

export function addColoredText(
  this: void,
  control: Control,
  text: string | undefined,
  color: readonly number[] | undefined
): undefined {
  if (text == null || color == null || color.length !== 3) {
    return undefined
  }

  const red = color[0] ?? 1
  const green = color[1] ?? 1
  const blue = color[2] ?? 1

  const buffer = control.GetNamedChild<TextBufferControl & Control>("Buffer")
  buffer?.AddMessage(text, red, green, blue)

  if (control.GetNamedChild("Slider") != null) {
    adjustSlider(control)
  }
  return undefined
}

export type TooltipSpec = string | number | ((this: void) => string)

export interface TooltipCarrier extends Control {
  tooltip?: TooltipSpec[] | string
  hidesTip?: boolean
}

const TIP_GAP = -2

function tooltipTextOf(this: void, tooltip: TooltipSpec): string {
  if (typeof tooltip === "string") return tooltip
  if (typeof tooltip === "number") return GetString(tooltip)
  if (typeof tooltip === "function") return tooltip()
  return ""
}

function hidesOnExit(this: void, control: TooltipCarrier): undefined {
  if (control.hidesTip === true) return undefined
  control.hidesTip = true
  ZO_PreHookHandler(control, "OnMouseExit", function (this: void): undefined {
    hidePopover()
    return undefined
  })
  return undefined
}

export function onMouseEnter(this: void, control: TooltipCarrier): undefined {
  const tooltipText = control.tooltip
  if (tooltipText == null || tooltipText.length === 0) return undefined
  const lines: string[] = []
  if (typeof tooltipText === "object") {
    for (const [, line] of ipairs(tooltipText)) lines.push(tooltipTextOf(line))
  } else {
    lines.push(tooltipText)
  }
  hidesOnExit(control)
  showPopover(control, lines, BOTTOMLEFT, 0, TIP_GAP, TOPLEFT)
  return undefined
}

interface ColorableControl extends Control {
  nocolor?: boolean
}

export function isLabelControl(this: void, control: Control): control is LabelControl {
  return control.GetType() === CT_LABEL
}

export function setLabelColor(this: void, control: Control, setcolor: string | ZoColor): undefined {
  for (let i = 1; i <= control.GetNumChildren(); i++) {
    const child = control.GetChild<ColorableControl>(i)
    if (child == null) {
      continue
    }
    const color = ZO_ColorDef.New(setcolor)

    if (child.nocolor !== true) {
      if (isLabelControl(child)) {
        child.SetColor(color.r, color.g, color.b, color.a)
      } else if (child.GetType() === CT_CONTROL) {
        setLabelColor(child, setcolor)
      }
    }
  }
  return undefined
}

TemperCombat.OnMouseEnter = onMouseEnter
TemperCombat.SetLabelColor = setLabelColor

export function namedChild<T extends Control = Control>(
  this: void,
  parent: Control,
  name: string
): T {
  const [control] = assert(parent.GetNamedChild<T>(name), `missing report control child ${name}`)
  return control
}
