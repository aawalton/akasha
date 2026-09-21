import "akasha/temper/addon/pages/lib-shifter-box/modules/shifter-list-class/shifter-list-class.module.code.ts"
import "akasha/temper/addon/pages/lib-shifter-box/modules/shifter-list-methods-entries/shifter-list-methods-entries.module.code.ts"
import "akasha/temper/addon/pages/lib-shifter-box/modules/shifter-list-methods-rows/shifter-list-methods-rows.module.code.ts"
import "akasha/temper/addon/pages/lib-shifter-box/modules/shifter-list-methods-drag/shifter-list-methods-drag.module.code.ts"
import "akasha/temper/addon/pages/lib-shifter-box/modules/shifter-box-class/shifter-box-class.module.code.ts"
import "akasha/temper/addon/pages/lib-shifter-box/modules/shifter-box-cursor-label/shifter-box-cursor-label.module.code.ts"
import "akasha/temper/addon/pages/lib-shifter-box/modules/shifter-lib-api/shifter-lib-api.module.code.ts"

import { asGlobalTable } from "akasha/temper/addon/pages/lib-shifter-box/modules/shifter-casts/shifter-casts.module.code.ts"
import { LIB_IDENTIFIER } from "akasha/temper/addon/pages/lib-shifter-box/modules/shifter-constants/shifter-constants.module.code.ts"
import { checkIfDraggedAndDisableUpdateHandler } from "akasha/temper/addon/pages/lib-shifter-box/modules/shifter-drag-helpers/shifter-drag-helpers.module.code.ts"
import {
  CM,
  EM,
  lib,
  validationTypeToFunc,
} from "akasha/temper/addon/pages/lib-shifter-box/modules/shifter-state/shifter-state.module.code.ts"
import {
  assertBoolean,
  assertFunction,
  assertPositiveNumber,
  assertSound,
  assertString,
  assertStringValueKey,
  assertTable,
  errorText,
} from "akasha/temper/addon/pages/lib-shifter-box/modules/shifter-validation/shifter-validation.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/addon/type/lib-shifter-box/lib-shifter-box.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-events/eso-events.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/addon/type/lib-addon-menu/lib-addon-menu.type-declaration.d.ts"

const EVENT_ADD_ON_LOADED_NAMESPACE = `${LIB_IDENTIFIER}_EVENT_ADD_ON_LOADED`

const glob = asGlobalTable(globalThis)
assert(glob[LIB_IDENTIFIER] === undefined, errorText(GetString(LIBSHIFTERBOX_ALLREADY_LOADED)))[0]
glob[LIB_IDENTIFIER] = lib

function onAddOnLoaded(this: void, _eventCode: number, ...args: unknown[]): undefined {
  const addonName = args[0]
  if (addonName !== LIB_IDENTIFIER) return
  EM.UnregisterForEvent(EVENT_ADD_ON_LOADED_NAMESPACE, EVENT_ADD_ON_LOADED)

  validationTypeToFunc.set("boolean", assertBoolean)
  validationTypeToFunc.set("stringValueKey", assertStringValueKey)
  validationTypeToFunc.set("string", assertString)
  validationTypeToFunc.set("positiveNumber", assertPositiveNumber)
  validationTypeToFunc.set("function", assertFunction)
  validationTypeToFunc.set("sound", assertSound)
  validationTypeToFunc.set("table", assertTable)

  if (LibAddonMenu2 !== undefined) {
    CM.RegisterCallback("LAM-PanelClosed", checkIfDraggedAndDisableUpdateHandler)
  }
}

EM.RegisterForEvent(EVENT_ADD_ON_LOADED_NAMESPACE, EVENT_ADD_ON_LOADED, onAddOnLoaded)
