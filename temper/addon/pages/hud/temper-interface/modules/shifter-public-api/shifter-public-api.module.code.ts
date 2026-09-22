import "akasha/temper/addon/pages/hud/temper-interface/modules/shifter-list-class/shifter-list-class.module.code.ts"
import "akasha/temper/addon/pages/hud/temper-interface/modules/shifter-list-methods-entries/shifter-list-methods-entries.module.code.ts"
import "akasha/temper/addon/pages/hud/temper-interface/modules/shifter-list-methods-rows/shifter-list-methods-rows.module.code.ts"
import "akasha/temper/addon/pages/hud/temper-interface/modules/shifter-list-methods-drag/shifter-list-methods-drag.module.code.ts"
import "akasha/temper/addon/pages/hud/temper-interface/modules/shifter-box-class/shifter-box-class.module.code.ts"
import "akasha/temper/addon/pages/hud/temper-interface/modules/shifter-box-cursor-label/shifter-box-cursor-label.module.code.ts"
import "akasha/temper/addon/pages/hud/temper-interface/modules/shifter-lib-api/shifter-lib-api.module.code.ts"

import { asShifterBoxHandle } from "akasha/temper/addon/pages/hud/temper-interface/modules/shifter-casts/shifter-casts.module.code.ts"
import { checkIfDraggedAndDisableUpdateHandler } from "akasha/temper/addon/pages/hud/temper-interface/modules/shifter-drag-helpers/shifter-drag-helpers.module.code.ts"
import {
  CM,
  lib,
  validationTypeToFunc,
} from "akasha/temper/addon/pages/hud/temper-interface/modules/shifter-state/shifter-state.module.code.ts"
import {
  assertBoolean,
  assertFunction,
  assertPositiveNumber,
  assertSound,
  assertString,
  assertStringValueKey,
  assertTable,
} from "akasha/temper/addon/pages/hud/temper-interface/modules/shifter-validation/shifter-validation.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/addon/type/temper-addon-menu-global/temper-addon-menu-global.type-declaration.d.ts"

validationTypeToFunc.set("boolean", assertBoolean)
validationTypeToFunc.set("stringValueKey", assertStringValueKey)
validationTypeToFunc.set("string", assertString)
validationTypeToFunc.set("positiveNumber", assertPositiveNumber)
validationTypeToFunc.set("function", assertFunction)
validationTypeToFunc.set("sound", assertSound)
validationTypeToFunc.set("table", assertTable)

export const shifterBox = asShifterBoxHandle(lib)

export function initShifterBox(this: void): undefined {
  if (TemperAddonMenu !== undefined) {
    CM.RegisterCallback("LAM-PanelClosed", checkIfDraggedAndDisableUpdateHandler)
  }
  return undefined
}
