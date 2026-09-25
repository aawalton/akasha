import {
  asNumber,
  asNumberOpt,
} from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-casts/sets-casts.module.code.ts"
import { lib } from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-lib/sets-lib.module.code.ts"
import {
  asControlWidthFunc,
  asNumberOrStringOpt,
} from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-search-ui-casts/sets-search-ui-casts.module.code.ts"
import { searchUI } from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-search-ui-shared-state/sets-search-ui-shared-state.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/addon/pages/items/crafting-sets/sets-search-ui-shapes/sets-search-ui-shapes.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-item-browser-port/eso-item-browser-port.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-journal-window/eso-journal-window.type-declaration.d.ts"

const searchUIKeyboardVars = searchUI.KeyboardVars
const TLC_SEARCH_UI_MIN_WIDTH = searchUIKeyboardVars.minWidth

lib.XMLGetDynamicWidth = function (
  this: void,
  xmlControl: SearchUIControl | undefined,
  minWidthIn?: number | string | ((this: void, control: SearchUIControl) => number),
  maxWidthIn?: number | string | ((this: void, control: SearchUIControl) => number),
  applyValuesIn?: boolean,
  minHeightIn?: number,
  maxHeightIn?: number,
  forceMaxWidthIn?: boolean
): number | string | undefined {
  const minHeight = minHeightIn ?? 10
  const maxHeight = maxHeightIn ?? 30
  const applyValues = applyValuesIn ?? false
  const forceMaxWidth = forceMaxWidthIn ?? false
  if (xmlControl === undefined) {
    return undefined
  }

  let newWidth: number | string = 0

  const tlcOfXMLControl = xmlControl.GetOwningWindow()
  if (tlcOfXMLControl === undefined) {
    return undefined
  }

  let minWidthValue: number | string | undefined
  let maxWidthValue: number | string | undefined

  const factorMultiplier = asNumberOpt(xmlControl.factorMultiplier) ?? 1

  let minWidth = minWidthIn
  let maxWidth = maxWidthIn
  if (minWidth === undefined) {
    minWidth = asNumberOrStringOpt(xmlControl.minX)
    if (minWidth === undefined) {
      return undefined
    }
  }
  if (maxWidth === undefined) {
    maxWidth = asNumberOrStringOpt(xmlControl.maxX)
  }

  const minWidthType = type(minWidth)
  if (minWidthType === "function") {
    minWidthValue = asControlWidthFunc(minWidth)(xmlControl)
  } else if (typeof minWidth === "string") {
    minWidthValue = minWidth
  } else if (typeof minWidth === "number") {
    minWidthValue = minWidth
  }

  const tlcWidth = tlcOfXMLControl.GetWidth()
  if (tlcWidth === undefined || tlcWidth <= 0) {
    return minWidthValue
  }

  if (minWidthValue !== undefined) {
    if (minWidthType === "string") {
      newWidth = minWidthValue
    } else {
      let minWidthNum = asNumber(minWidthValue)
      if (minWidthNum < 0) {
        minWidthNum = 0
      }
      minWidthValue = minWidthNum
      if (tlcWidth > TLC_SEARCH_UI_MIN_WIDTH) {
        const calculationFactor =
          zo_clamp(tlcWidth / TLC_SEARCH_UI_MIN_WIDTH, 1, 10) * factorMultiplier
        newWidth = zo_clamp(minWidthNum * calculationFactor, minWidthNum, tlcWidth)
      } else {
        newWidth = minWidthNum
      }
    }
  }

  if (maxWidth !== undefined) {
    let maxWidthType = type(maxWidth)
    if (maxWidthType === "function") {
      maxWidthValue = asControlWidthFunc(maxWidth)(xmlControl)
    } else if (typeof maxWidth === "string") {
      maxWidthValue = maxWidth
      if (zo_plainstrfind(maxWidth, "calcByTLCWidth,") !== undefined) {
        const value = tonumber(string.sub(maxWidth, 16))
        if (type(value) === "number" && value !== undefined) {
          maxWidthValue = tlcWidth + value
          maxWidthType = "number"
        }
      }
    } else if (typeof maxWidth === "number") {
      maxWidthValue = maxWidth
    }
    if (maxWidthValue !== undefined && maxWidthType !== "string") {
      newWidth = zo_clamp(asNumber(newWidth), asNumber(minWidthValue), asNumber(maxWidthValue))
    }
  }

  if (applyValues) {
    if (xmlControl.SetDimensionConstraints !== undefined) {
      const newWidthNum = asNumber(newWidth)
      xmlControl.SetDimensionConstraints(
        newWidthNum,
        minHeight,
        !forceMaxWidth ? newWidthNum : maxWidthValue,
        maxHeight
      )
    }
  }
  return newWidth
}
