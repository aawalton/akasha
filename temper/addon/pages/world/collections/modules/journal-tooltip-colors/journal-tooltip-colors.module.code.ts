import {
  asGlobalTable,
  asNumber,
} from "akasha/temper/addon/pages/world/collections/modules/journal-casts/journal-casts.module.code.ts"
import {
  Internal,
  Public,
} from "akasha/temper/addon/pages/world/collections/modules/journal-state/journal-state.module.code.ts"
import { LCCC } from "akasha/temper/addon/shared/lccc/modules/lccc/lccc.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/design/language/lua-compiler/language-extensions/language-extensions.type-declaration.d.ts"
import "akasha/temper/addon/pages/world/collections/journal-saved-variables/journal-saved-variables.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-journal-window/eso-journal-window.type-declaration.d.ts"

const DEFAULTS: Record<number, Record<number, number>> = {
  [1]: {
    [1]: 0x00ff00,
    [2]: 0xff0000,
    [3]: 0xffff00,
  },
  [2]: {
    [0]: 0x333333,
    [1]: 0x3399ff,
    [2]: 0x777766,
  },
}

const CURRENT: { rows: Record<number, Record<number, number | undefined>> } = { rows: {} }

function validate(this: void, m: number, n: number): boolean {
  return (
    (m === 1 && (n === 1 || n === 2 || n === 3)) || (m === 2 && (n === 0 || n === 1 || n === 2))
  )
}

Internal.LoadTooltipColors = (): undefined => {
  CURRENT.rows = TemperCollections_TooltipColors ?? {}
  CURRENT.rows[1] = CURRENT.rows[1] ?? {}
  CURRENT.rows[2] = CURRENT.rows[2] ?? {}
}

Public.GetTooltipColor = (m: number, n: number): number => {
  if (validate(m, n)) {
    const currentRow = CURRENT.rows[m]
    const fromCurrent = currentRow !== undefined ? currentRow[n] : undefined
    return fromCurrent ?? asNumber(DEFAULTS[m]?.[n])
  }
  return 0
}

Public.GetTooltipColorUnpacked = (
  m: number,
  n: number
): LuaMultiReturn<[number, number, number]> => {
  return LCCC.Int24ToRGB(Public.GetTooltipColor(m, n))
}

Public.SetTooltipColor = (m: number, n: number, color?: number, ...rgba: number[]): undefined => {
  if (validate(m, n)) {
    let colorLocal = color
    const g = rgba[0]
    const b = rgba[1]
    if (type(g) === "number" && type(b) === "number") {
      colorLocal = LCCC.RGBToInt24(asNumber(color), asNumber(g), asNumber(b))
    }
    const defaultsRow = DEFAULTS[m]
    const currentRow = CURRENT.rows[m]
    if (defaultsRow !== undefined && currentRow !== undefined) {
      if (defaultsRow[n] !== colorLocal) {
        currentRow[n] = colorLocal
        asGlobalTable(_G).TemperCollections_TooltipColors = CURRENT.rows
      } else {
        currentRow[n] = undefined
      }
    }
  }
}

Public.SelectComboBoxItemByIndex = (
  object: ZoComboBox,
  index: number,
  ...args: unknown[]
): undefined => {
  let idx = index
  if (type(index) !== "number" || index < 1 || index > object.GetNumItems()) {
    idx = 1
  }
  object.SelectItemByIndex(idx, ...args)
}
