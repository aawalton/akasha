import type { UpdatableControl } from "@akasha/temper-combat-addon/combat-ui-state"
import { isObjectRecord } from "@akasha/utils-narrow/is-object-record"

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
  return typeof value === "object" && value !== null
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
}

export function addTooltipLine(
  this: void,
  control: Control,
  tooltipControl: TooltipControl,
  tooltip: TooltipSpec
): undefined {
  let text: string

  if (typeof tooltip === "string") {
    if (tooltip === "") {
      ZO_Options_OnMouseExit(control)
      return undefined
    }
    text = tooltip
  } else if (typeof tooltip === "number") {
    text = GetString(tooltip)
  } else if (typeof tooltip === "function") {
    text = tooltip()
  } else {
    ZO_Options_OnMouseExit(control)
    return undefined
  }

  SetTooltipText(tooltipControl, text)
  return undefined
}

export function onMouseEnter(this: void, control: TooltipCarrier): undefined {
  const tooltipText = control.tooltip

  if (tooltipText != null && tooltipText.length > 0) {
    InitializeTooltip(InformationTooltip, control, BOTTOMLEFT, 0, -2, TOPLEFT)

    if (typeof tooltipText === "object") {
      for (const [, line] of ipairs(tooltipText)) {
        addTooltipLine(control, InformationTooltip, line)
      }
    } else {
      addTooltipLine(control, InformationTooltip, tooltipText)
    }
  }
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
