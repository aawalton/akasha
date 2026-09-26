import { MAP_PINS } from "akasha/temper/addon/pages/world/map-pins/modules/map-pins-public-api/map-pins-public-api.module.code.ts"
import { loadedIcons } from "akasha/temper/addon/pages/world/markers/modules/markers-codec/markers-codec.module.code.ts"
import type { MarkerIcon } from "akasha/temper/addon/pages/world/markers/modules/markers-state/markers-state.module.code.ts"
import { drawnTexture } from "akasha/temper/addon/pages/world/markers/modules/markers-textures/markers-textures.module.code.ts"
import "akasha/temper/addon/pages/world/map-pins/map-pins-declarations/map-pins-declarations.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-04/eso-functions-04.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-lore-library/eso-lore-library.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-map-ui/eso-map-ui.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-4/eso-ui-4.type-declaration.d.ts"

const PIN_TYPE = "TemperWorldMarkersPin"

interface KeyboardTooltip {
  AddLine: (this: KeyboardTooltip, text: string) => void
}

interface GamepadSection {
  AddLine: (this: GamepadSection, text: string, ...styles: unknown[]) => void
}

interface GamepadTooltip {
  tooltip: {
    AcquireSection: (this: unknown, style: unknown) => GamepadSection
    GetStyle: (this: unknown, name: string) => unknown
    AddSection: (this: unknown, section: GamepadSection) => void
  }
}

function tagOf(this: void, pin: MapPin): MarkerIcon {
  const [, pinTag] = pin.GetPinTypeAndTag()
  return pinTag as MarkerIcon
}

function addMarkerPins(this: void): undefined {
  if (MAP_PINS.IsEnabled(PIN_TYPE) !== true) return undefined
  const [zone] = GetUnitWorldPosition("player")
  for (const icon of loadedIcons()) {
    const [nx, ny] = GetNormalizedWorldPosition(zone, icon.x, icon.y, icon.z)
    if (nx >= 0 && nx <= 1 && ny >= 0 && ny <= 1) {
      MAP_PINS.CreatePin(PIN_TYPE, ZO_DeepTableCopy(icon), nx, ny)
    }
  }
  return undefined
}

function showTooltip(this: void, pin: MapPin): undefined {
  const text = tagOf(pin).text
  const tooltip = ZO_WorldMap_GetTooltipForMode(ZO_MAP_TOOLTIP_MODE.INFORMATION) as
    | KeyboardTooltip
    | GamepadTooltip
  if ("AddLine" in tooltip) {
    tooltip.AddLine(text)
  } else {
    const base = tooltip.tooltip
    const section = base.AcquireSection(base.GetStyle("bodySection"))
    section.AddLine(text, base.GetStyle("bodyDescription"), base.GetStyle("whiteFontColor"))
    base.AddSection(section)
  }
  return undefined
}

export function initMarkerPins(this: void): undefined {
  MAP_PINS.AddPinType(
    PIN_TYPE,
    addMarkerPins,
    undefined,
    {
      level: 5,
      texture: (pin) => drawnTexture(tagOf(pin).bgTexture ?? ""),
      tint: (pin: MapPin) => ZO_ColorDef.New(tagOf(pin).colourHex ?? "ffffff"),
      size: 25,
    },
    { creator: showTooltip, tooltip: ZO_MAP_TOOLTIP_MODE.INFORMATION }
  )
  MAP_PINS.AddPinFilter(PIN_TYPE, "More Markers", false, {})
  return undefined
}

export function refreshMarkerPins(this: void): undefined {
  MAP_PINS.RefreshPins(PIN_TYPE)
  return undefined
}
