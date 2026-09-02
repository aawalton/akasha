import {
  type FontSizeItem,
  type FrameStyleItem,
  holder,
  type VotansMiniMap,
} from "../minimap-holder/minimap-holder.module.code.ts"

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
  this: VotansMiniMap,
  sizeName: string | number
): FontSizeItem | undefined {
  return LOOKUP.nameToFontSize[sizeName]
}

holder.GetStyleByName = function (this: VotansMiniMap, name: string): FrameStyleItem | undefined {
  return LOOKUP.frameToFile[name]
}

holder.AddBorderStyle = function (
  this: VotansMiniMap,
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

holder.AddFont = function (this: VotansMiniMap, font: string, displayText: string): undefined {
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
  this: VotansMiniMap,
  fontSize: number,
  displayText: string,
  offsetY: number
): undefined {
  LOOKUP.fontSizes.push({
    name: displayText,
    data: { size: fontSize, offsetY },
  })
}

holder.InitMapSettings = function (this: VotansMiniMap): undefined {
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
      "VOTAN_MINIMAP_FONT",
      "$(MEDIUM_FONT)|" + tostring(this.account.titleFontSize)
    )
    VOTAN_MINIMAP_FONT = font
    const [, fontSize] = font.GetFontInfo()
    this.account.titleFontSize = fontSize
  }
  if (LOOKUP.nameToFontSize[this.account.titleFontSize] == null) {
    this.account.titleFontSize = 16
  }
}
