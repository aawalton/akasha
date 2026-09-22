import {
  type FontSizeItem,
  type FrameStyleItem,
  holder,
  type TemperMiniMap,
} from "akasha/temper/addon/pages/world/navigation/modules/minimap-holder/minimap-holder.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/addon/pages/world/navigation/navigation-declarations/navigation-declarations.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-item-browser-port/eso-item-browser-port.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-world-map-window/eso-world-map-window.type-declaration.d.ts"

interface FontItem {
  name: string
  data: string
}

export interface Lookup {
  frameStyles: FrameStyleItem[]
  fonts: FontItem[]
  fontSizes: FontSizeItem[]
  frameToFile: Record<string, FrameStyleItem | undefined>
  nameToFont: Record<string, FontItem | undefined>
  nameToFontSize: Record<string | number, FontSizeItem | undefined>
}

export const LOOKUP: Lookup = {
  frameStyles: [],
  fonts: [],
  fontSizes: [],
  frameToFile: {},
  nameToFont: {},
  nameToFontSize: {},
}

holder.GetFontSizeBySizeName = function (
  this: TemperMiniMap,
  sizeName: string | number
): FontSizeItem | undefined {
  return LOOKUP.nameToFontSize[sizeName]
}

holder.GetStyleByName = function (this: TemperMiniMap, name: string): FrameStyleItem | undefined {
  return LOOKUP.frameToFile[name]
}

holder.AddBorderStyle = function (
  this: TemperMiniMap,
  name: string,
  displayText: string,
  setupFunction: (this: void, ...args: unknown[]) => unknown,
  resetFunction: ((this: void, ...args: unknown[]) => unknown) | undefined
): undefined {
  LOOKUP.frameStyles.push({
    name: displayText,
    data: { value: name, setup: setupFunction, reset: resetFunction },
  })
}

holder.AddFont = function (this: TemperMiniMap, font: string, displayText: string): undefined {
  if (zo_plainstrfind(font, "/")) {
    this.fontFaces[font] = font
  } else {
    if (this.fontFaces[font] == null) {
      this.fontFaces[font] = "$(" + font + ")"
    }
  }
  LOOKUP.fonts.push({ name: displayText, data: font })
}

holder.AddFontSize = function (
  this: TemperMiniMap,
  fontSize: number,
  displayText: string,
  offsetY: number
): undefined {
  LOOKUP.fontSizes.push({
    name: displayText,
    data: { size: fontSize, offsetY },
  })
}

holder.InitMapSettings = function (this: TemperMiniMap): undefined {
  LOOKUP.frameToFile = {}
  for (const item of LOOKUP.frameStyles) {
    LOOKUP.frameToFile[item.data.value] = item
  }
  if (LOOKUP.frameToFile[this.account.frameStyle] == null) {
    this.account.frameStyle = "Default"
  }

  LOOKUP.nameToFont = {}
  for (const item of LOOKUP.fonts) {
    LOOKUP.nameToFont[item.data] = item
  }
  if (LOOKUP.nameToFont[this.account.titleFont] == null) {
    this.account.titleFont = "BOLD_FONT"
  }

  LOOKUP.nameToFontSize = {}
  for (const item of LOOKUP.fontSizes) {
    LOOKUP.nameToFontSize[item.data.size] = item
  }
  if (type(this.account.titleFontSize) === "string") {
    const font = CreateFont(
      "TEMPER_MINIMAP_FONT",
      "$(MEDIUM_FONT)|" + tostring(this.account.titleFontSize)
    )
    TEMPER_MINIMAP_FONT = font
    const [, fontSize] = font.GetFontInfo()
    this.account.titleFontSize = fontSize
  }
  if (LOOKUP.nameToFontSize[this.account.titleFontSize] == null) {
    this.account.titleFontSize = 16
  }
}
